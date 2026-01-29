import { useState, useEffect } from 'react'
import api, { authApi, getAuthToken, clearAuthToken } from '../services/api'
import './Admin.css'

// Duration calculation helper
const calculateDuration = (period) => {
    if (!period) return ''

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    // Parse period like "Sep 2025 - Present" or "Jun 2024 - Jun 2025"
    const parts = period.split(' - ')
    if (parts.length !== 2) return ''

    const parseDate = (str) => {
        const words = str.trim().split(' ')
        if (words.length < 2) return null

        let monthStr = words[0]
        let year = parseInt(words[1])

        let monthIndex = months.findIndex(m => monthStr.startsWith(m))
        if (monthIndex === -1) {
            monthIndex = monthsFull.findIndex(m => monthStr.startsWith(m))
        }

        if (monthIndex === -1 || isNaN(year)) return null
        return new Date(year, monthIndex, 1)
    }

    const startDate = parseDate(parts[0])
    const endDate = parts[1].toLowerCase().includes('present') ? new Date() : parseDate(parts[1])

    if (!startDate || !endDate) return ''

    const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1

    if (diffMonths < 1) return '1 month'
    if (diffMonths === 1) return '1 month'
    if (diffMonths < 12) return `${diffMonths} months`

    const years = Math.floor(diffMonths / 12)
    const remainingMonths = diffMonths % 12

    if (remainingMonths === 0) return years === 1 ? '1 year' : `${years} years`
    if (years === 1) return remainingMonths === 1 ? '1 year 1 month' : `1 year ${remainingMonths} months`
    return remainingMonths === 1 ? `${years} years 1 month` : `${years} years ${remainingMonths} months`
}

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [activeTab, setActiveTab] = useState('profile')
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [editingItem, setEditingItem] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [skillLevels, setSkillLevels] = useState({}) // Local state for skill sliders
    const [skillsChanged, setSkillsChanged] = useState(false)

    useEffect(() => {
        const token = getAuthToken()
        if (token) {
            setIsLoggedIn(true)
            loadData()
        }
    }, [])

    // Initialize skill levels when data loads
    useEffect(() => {
        if (data.skillCategories) {
            const levels = {}
            data.skillCategories.forEach(cat => {
                cat.skills?.forEach(skill => {
                    levels[skill.id] = skill.level
                })
            })
            setSkillLevels(levels)
            setSkillsChanged(false)
        }
    }, [data.skillCategories])

    const loadData = async () => {
        setLoading(true)
        try {
            const [profile, about, stats, experiences, skillCategories, projects, contact, socialLinks] = await Promise.all([
                api.profile.get().catch(() => null),
                api.about.get().catch(() => null),
                api.stats.getAll().catch(() => []),
                api.experiences.getAll().catch(() => []),
                api.skillCategories.getAll().catch(() => []),
                api.projects.getAll().catch(() => []),
                api.contact.get().catch(() => null),
                api.socialLinks.getAll().catch(() => [])
            ])
            setData({ profile, about, stats, experiences, skillCategories, projects, contact, socialLinks })
        } catch (err) {
            console.error('Failed to load data:', err)
        }
        setLoading(false)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await authApi.login(username, password)
            setIsLoggedIn(true)
            loadData()
        } catch (err) {
            setError('Invalid username or password')
        }
    }

    const handleLogout = () => {
        clearAuthToken()
        setIsLoggedIn(false)
        setData({})
    }

    const showMessage = (msg) => {
        setMessage(msg)
        setTimeout(() => setMessage(''), 3000)
    }

    const resetForm = () => {
        setEditingItem(null)
        setShowForm(false)
    }

    // Profile handlers
    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const updates = Object.fromEntries(formData)
        try {
            await api.profile.update(updates)
            showMessage('Profile updated successfully!')
            loadData()
        } catch (err) {
            showMessage('Failed to update profile')
        }
    }

    // About handlers
    const handleAboutUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const updates = Object.fromEntries(formData)
        updates.whatIDo = updates.whatIDo.split('\n').filter(item => item.trim())
        try {
            await api.about.update(updates)
            showMessage('About section updated!')
            loadData()
        } catch (err) {
            showMessage('Failed to update about section')
        }
    }

    // Contact handlers
    const handleContactUpdate = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const updates = Object.fromEntries(formData)
        try {
            await api.contact.update(updates)
            showMessage('Contact info updated!')
            loadData()
        } catch (err) {
            showMessage('Failed to update contact')
        }
    }

    // Experience handlers with auto duration
    const handleExperienceSave = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const itemData = Object.fromEntries(formData)
        itemData.technologies = itemData.technologies.split(',').map(t => t.trim())
        itemData.displayOrder = parseInt(itemData.displayOrder) || 1

        // Auto-calculate duration if period is provided
        if (itemData.period) {
            const calculatedDuration = calculateDuration(itemData.period)
            if (calculatedDuration) {
                itemData.duration = calculatedDuration
            }
        }

        try {
            if (editingItem?.id) {
                await api.experiences.update(editingItem.id, itemData)
                showMessage('Experience updated!')
            } else {
                await api.experiences.create(itemData)
                showMessage('Experience added!')
            }
            resetForm()
            loadData()
        } catch (err) {
            showMessage('Failed to save experience')
        }
    }

    const handleExperienceDelete = async (id) => {
        if (confirm('Delete this experience?')) {
            try {
                await api.experiences.delete(id)
                showMessage('Experience deleted!')
                loadData()
            } catch (err) {
                showMessage('Failed to delete')
            }
        }
    }

    // Project handlers
    const handleProjectSave = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const itemData = Object.fromEntries(formData)
        itemData.technologies = itemData.technologies.split(',').map(t => t.trim())
        itemData.displayOrder = parseInt(itemData.displayOrder) || 1

        try {
            if (editingItem?.id) {
                await api.projects.update(editingItem.id, itemData)
                showMessage('Project updated!')
            } else {
                await api.projects.create(itemData)
                showMessage('Project added!')
            }
            resetForm()
            loadData()
        } catch (err) {
            showMessage('Failed to save project')
        }
    }

    const handleProjectDelete = async (id) => {
        if (confirm('Delete this project?')) {
            try {
                await api.projects.delete(id)
                showMessage('Project deleted!')
                loadData()
            } catch (err) {
                showMessage('Failed to delete')
            }
        }
    }

    // Skill handlers - Local state update (no API call)
    const handleSkillLevelChange = (skillId, newLevel) => {
        setSkillLevels(prev => ({ ...prev, [skillId]: parseInt(newLevel) }))
        setSkillsChanged(true)
    }

    // Batch save all skill changes
    const handleSaveAllSkills = async () => {
        setLoading(true)
        try {
            // Find skills that changed
            const updates = []
            data.skillCategories?.forEach(cat => {
                cat.skills?.forEach(skill => {
                    if (skillLevels[skill.id] !== skill.level) {
                        updates.push({ id: skill.id, level: skillLevels[skill.id] })
                    }
                })
            })

            // Update each changed skill
            await Promise.all(updates.map(u => api.skills.update(u.id, { level: u.level })))

            showMessage(`${updates.length} skill(s) updated!`)
            setSkillsChanged(false)
            loadData()
        } catch (err) {
            showMessage('Failed to save skills')
        }
        setLoading(false)
    }

    if (!isLoggedIn) {
        return (
            <div className="admin-login">
                <div className="login-card">
                    <h1>🔐 Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-panel">
            <header className="admin-header">
                <h1>📊 Portfolio Admin</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            {message && <div className="message">{message}</div>}

            <nav className="admin-nav">
                {['profile', 'about', 'experiences', 'projects', 'skills', 'contact'].map(tab => (
                    <button
                        key={tab}
                        className={activeTab === tab ? 'active' : ''}
                        onClick={() => { setActiveTab(tab); resetForm(); }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </nav>

            <main className="admin-content">
                {loading && <div className="loading">Loading...</div>}

                {/* PROFILE TAB */}
                {activeTab === 'profile' && data.profile && (
                    <section className="admin-section">
                        <h2>Profile Settings</h2>
                        <form onSubmit={handleProfileUpdate}>
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" defaultValue={data.profile.name} required />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input name="title" defaultValue={data.profile.title} required />
                            </div>
                            <div className="form-group">
                                <label>Subtitle</label>
                                <input name="subtitle" defaultValue={data.profile.subtitle} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" defaultValue={data.profile.description} rows="3" />
                            </div>
                            <div className="form-group">
                                <label>GitHub URL</label>
                                <input name="githubUrl" defaultValue={data.profile.githubUrl} />
                            </div>
                            <div className="form-group">
                                <label>LinkedIn URL</label>
                                <input name="linkedinUrl" defaultValue={data.profile.linkedinUrl} />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="email" defaultValue={data.profile.email} required />
                            </div>
                            <button type="submit" className="save-btn">Save Changes</button>
                        </form>
                    </section>
                )}

                {/* ABOUT TAB */}
                {activeTab === 'about' && data.about && (
                    <section className="admin-section">
                        <h2>About Section</h2>
                        <form onSubmit={handleAboutUpdate}>
                            <div className="form-group">
                                <label>Intro</label>
                                <textarea name="intro" defaultValue={data.about.intro} rows="4" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Education Title</label>
                                    <input name="educationTitle" defaultValue={data.about.educationTitle} />
                                </div>
                                <div className="form-group">
                                    <label>Education Detail</label>
                                    <input name="educationDetail" defaultValue={data.about.educationDetail} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Current Role</label>
                                    <input name="currentRole" defaultValue={data.about.currentRole} />
                                </div>
                                <div className="form-group">
                                    <label>Current Company</label>
                                    <input name="currentCompany" defaultValue={data.about.currentCompany} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Focus Title</label>
                                    <input name="focusTitle" defaultValue={data.about.focusTitle} />
                                </div>
                                <div className="form-group">
                                    <label>Focus Detail</label>
                                    <input name="focusDetail" defaultValue={data.about.focusDetail} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>What I Do (one per line)</label>
                                <textarea
                                    name="whatIDo"
                                    defaultValue={Array.isArray(data.about.whatIDo) ? data.about.whatIDo.join('\n') : data.about.whatIDo}
                                    rows="4"
                                />
                            </div>
                            <div className="form-group">
                                <label>CTA Text</label>
                                <textarea name="ctaText" defaultValue={data.about.ctaText} rows="2" />
                            </div>
                            <button type="submit" className="save-btn">Save Changes</button>
                        </form>
                    </section>
                )}

                {/* EXPERIENCES TAB */}
                {activeTab === 'experiences' && (
                    <section className="admin-section">
                        <div className="section-header">
                            <h2>Experiences</h2>
                            <button className="add-btn" onClick={() => { setEditingItem({}); setShowForm(true); }}>+ Add New</button>
                        </div>

                        {showForm && (
                            <form onSubmit={handleExperienceSave} className="edit-form">
                                <h3>{editingItem?.id ? 'Edit Experience' : 'Add Experience'}</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input name="title" defaultValue={editingItem?.title} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input name="company" defaultValue={editingItem?.company} required />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Type</label>
                                        <input name="type" defaultValue={editingItem?.type} placeholder="Internship, Full-time, etc." />
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>
                                        <input name="location" defaultValue={editingItem?.location} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Period (duration will be auto-calculated)</label>
                                    <input name="period" defaultValue={editingItem?.period} placeholder="Sep 2025 - Present" />
                                    <small style={{ color: 'rgba(255,255,255,0.5)', marginTop: '4px', display: 'block' }}>
                                        Format: "Mon YYYY - Mon YYYY" or "Mon YYYY - Present"
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea name="description" defaultValue={editingItem?.description} rows="3" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Technologies (comma separated)</label>
                                        <input name="technologies" defaultValue={Array.isArray(editingItem?.technologies) ? editingItem.technologies.join(', ') : editingItem?.technologies} />
                                    </div>
                                    <div className="form-group" style={{ maxWidth: '100px' }}>
                                        <label>Order</label>
                                        <input name="displayOrder" type="number" defaultValue={editingItem?.displayOrder || 1} />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="save-btn">Save</button>
                                    <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>
                                </div>
                            </form>
                        )}

                        <div className="items-list">
                            {data.experiences?.map(exp => (
                                <div key={exp.id} className="item-card">
                                    <div className="item-info">
                                        <h3>{exp.title}</h3>
                                        <p>{exp.company} • {exp.period} • <span style={{ color: '#a5b4fc' }}>{exp.duration}</span></p>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => { setEditingItem(exp); setShowForm(true); }} className="edit-btn">✏️</button>
                                        <button onClick={() => handleExperienceDelete(exp.id)} className="delete-btn">🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                    <section className="admin-section">
                        <div className="section-header">
                            <h2>Projects</h2>
                            <button className="add-btn" onClick={() => { setEditingItem({}); setShowForm(true); }}>+ Add New</button>
                        </div>

                        {showForm && (
                            <form onSubmit={handleProjectSave} className="edit-form">
                                <h3>{editingItem?.id ? 'Edit Project' : 'Add Project'}</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input name="title" defaultValue={editingItem?.title} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input name="category" defaultValue={editingItem?.category} placeholder="Frontend, Backend, Full-Stack" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea name="description" defaultValue={editingItem?.description} rows="3" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Technologies (comma separated)</label>
                                        <input name="technologies" defaultValue={Array.isArray(editingItem?.technologies) ? editingItem.technologies.join(', ') : editingItem?.technologies} />
                                    </div>
                                    <div className="form-group" style={{ maxWidth: '100px' }}>
                                        <label>Year</label>
                                        <input name="year" defaultValue={editingItem?.year} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>GitHub URL</label>
                                        <input name="githubUrl" defaultValue={editingItem?.githubUrl} />
                                    </div>
                                    <div className="form-group">
                                        <label>Demo URL</label>
                                        <input name="demoUrl" defaultValue={editingItem?.demoUrl} />
                                    </div>
                                </div>
                                <div className="form-group" style={{ maxWidth: '100px' }}>
                                    <label>Order</label>
                                    <input name="displayOrder" type="number" defaultValue={editingItem?.displayOrder || 1} />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="save-btn">Save</button>
                                    <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>
                                </div>
                            </form>
                        )}

                        <div className="items-list">
                            {data.projects?.map(proj => (
                                <div key={proj.id} className="item-card">
                                    <div className="item-info">
                                        <h3>{proj.title}</h3>
                                        <p>{proj.category} • {proj.year}</p>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => { setEditingItem(proj); setShowForm(true); }} className="edit-btn">✏️</button>
                                        <button onClick={() => handleProjectDelete(proj.id)} className="delete-btn">🗑️</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* SKILLS TAB - Batch Save */}
                {activeTab === 'skills' && (
                    <section className="admin-section">
                        <div className="section-header">
                            <h2>Skills</h2>
                            {skillsChanged && (
                                <button className="save-btn" onClick={handleSaveAllSkills}>
                                    💾 Save All Changes
                                </button>
                            )}
                        </div>
                        <p className="section-hint">Adjust skill levels using the sliders, then click "Save All Changes"</p>
                        <div className="skills-editor">
                            {data.skillCategories?.map(cat => (
                                <div key={cat.id} className="category-card">
                                    <h3>{cat.icon} {cat.title}</h3>
                                    <div className="skills-edit-list">
                                        {cat.skills?.map(skill => (
                                            <div key={skill.id} className="skill-edit-row">
                                                <span className="skill-name">{skill.name}</span>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={skillLevels[skill.id] ?? skill.level}
                                                    onChange={(e) => handleSkillLevelChange(skill.id, e.target.value)}
                                                    className="skill-slider"
                                                />
                                                <span className="skill-level">{skillLevels[skill.id] ?? skill.level}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {skillsChanged && (
                            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                <button className="save-btn" onClick={handleSaveAllSkills}>
                                    💾 Save All Skill Changes
                                </button>
                            </div>
                        )}
                    </section>
                )}

                {/* CONTACT TAB */}
                {activeTab === 'contact' && data.contact && (
                    <section className="admin-section">
                        <h2>Contact Info</h2>
                        <form onSubmit={handleContactUpdate}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input name="email" type="email" defaultValue={data.contact.email} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input name="phone" defaultValue={data.contact.phone} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input name="location" defaultValue={data.contact.location} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Intro Title</label>
                                    <input name="introTitle" defaultValue={data.contact.introTitle} />
                                </div>
                                <div className="form-group">
                                    <label>CTA Text</label>
                                    <input name="ctaText" defaultValue={data.contact.ctaText} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Intro Text</label>
                                <textarea name="introText" defaultValue={data.contact.introText} rows="3" />
                            </div>
                            <button type="submit" className="save-btn">Save Changes</button>
                        </form>
                    </section>
                )}
            </main>
        </div>
    )
}

export default Admin
