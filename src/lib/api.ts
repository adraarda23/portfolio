import type {
  About,
  Contact,
  ContactFormPayload,
  Experience,
  LoginResponse,
  Profile,
  Project,
  Skill,
  SkillCategory,
  SocialLink,
  Stat,
  WithoutId,
} from './types'

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || '/api'
const TOKEN_KEY = 'portfolio_token'
const USERNAME_KEY = 'portfolio_username'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  getUsername: () => localStorage.getItem(USERNAME_KEY),
  setSession: (token: string, username: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USERNAME_KEY, username)
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USERNAME_KEY)
  },
  isLoggedIn: () => Boolean(localStorage.getItem(TOKEN_KEY)),
}

async function request<T>(path: string, init: RequestInit = {}, withAuth = false): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string> | undefined),
  }
  if (withAuth) {
    const token = auth.getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers })

  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const body = await response.json()
      // ASP.NET validation errors arrive as problem+json: { title, errors: { Field: [msg] } }
      const firstError = body?.errors ? (Object.values(body.errors).flat()[0] as string | undefined) : undefined
      if (body?.message) message = body.message
      else if (firstError) message = firstError
    } catch {
      /* non-JSON error body */
    }
    if (response.status === 401 && withAuth) auth.clear()
    throw new ApiError(response.status, message)
  }

  const text = await response.text()
  return (text ? JSON.parse(text) : null) as T
}

const json = (body: unknown) => JSON.stringify(body)

function crud<T extends { id: number }>(resource: string) {
  return {
    getAll: () => request<T[]>(`/${resource}`),
    get: (id: number) => request<T>(`/${resource}/${id}`),
    create: (data: WithoutId<T>) => request<T>(`/${resource}`, { method: 'POST', body: json(data) }, true),
    update: (id: number, data: WithoutId<T>) =>
      request<void>(`/${resource}/${id}`, { method: 'PUT', body: json(data) }, true),
    remove: (id: number) => request<void>(`/${resource}/${id}`, { method: 'DELETE' }, true),
  }
}

function singleton<T extends { id: number }>(resource: string) {
  return {
    get: () => request<T>(`/${resource}`),
    update: (data: WithoutId<T>) => request<void>(`/${resource}`, { method: 'PUT', body: json(data) }, true),
  }
}

export const api = {
  profile: singleton<Profile>('profile'),
  about: singleton<About>('about'),
  contact: singleton<Contact>('contact'),
  stats: crud<Stat>('stats'),
  experiences: crud<Experience>('experiences'),
  skillCategories: crud<SkillCategory>('skill-categories'),
  skills: crud<Skill>('skills'),
  projects: crud<Project>('projects'),
  socialLinks: crud<SocialLink>('social-links'),
  email: {
    send: (payload: ContactFormPayload) =>
      request<{ message: string }>('/email/send', { method: 'POST', body: json(payload) }),
  },
  auth: {
    login: async (username: string, password: string) => {
      const res = await request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: json({ username, password }),
      })
      auth.setSession(res.token, res.username)
      return res
    },
    logout: () => auth.clear(),
    changePassword: (username: string, currentPassword: string, newPassword: string) =>
      request<{ message: string }>(
        '/auth/change-password',
        { method: 'POST', body: json({ username, currentPassword, newPassword }) },
        true,
      ),
  },
}

export const byOrder = <T extends { displayOrder: number }>(items: T[]) =>
  [...items].sort((a, b) => a.displayOrder - b.displayOrder)
