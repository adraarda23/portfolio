import type { ComponentType } from 'react'
import {
  FaAngular,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaGitAlt,
  FaGithub,
  FaInstagram,
  FaJava,
  FaLinkedin,
  FaLinux,
  FaMedium,
  FaNode,
  FaPython,
  FaReact,
  FaTwitter,
  FaYoutube,
  FaCode,
  FaAws,
  FaVuejs,
  FaHtml5,
  FaCss3Alt,
  FaServer,
} from 'react-icons/fa'
import {
  SiApachekafka,
  SiDotnet,
  SiExpress,
  SiFlask,
  SiGo,
  SiGraphql,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNginx,
  SiNextdotjs,
  SiPostgresql,
  SiRabbitmq,
  SiRedis,
  SiRedux,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiX,
  SiSqlite,
  SiFirebase,
  SiCplusplus,
  SiRust,
  SiSharp,
} from 'react-icons/si'
import type { IconBaseProps } from 'react-icons'

export type IconComponent = ComponentType<IconBaseProps>

/**
 * Icons that the admin can reference by `iconClass`. Keys match the react-icons
 * export names so content stays portable.
 */
export const iconRegistry: Record<string, IconComponent> = {
  SiJavascript,
  SiTypescript,
  FaPython,
  FaJava,
  FaDatabase,
  FaReact,
  FaAngular,
  FaVuejs,
  SiNextdotjs,
  SiRedux,
  FaNode,
  SiExpress,
  SiFlask,
  SiSpringboot,
  SiDotnet,
  SiGo,
  SiRust,
  SiCplusplus,
  SiSharp,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiRedis,
  SiFirebase,
  FaDocker,
  SiKubernetes,
  FaAws,
  FaGitAlt,
  FaLinux,
  SiNginx,
  SiApachekafka,
  SiRabbitmq,
  SiTailwindcss,
  FaHtml5,
  FaCss3Alt,
  HtmlCss: FaHtml5,
  RestApi: FaServer,
  FaCode,
  FaServer,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  SiX,
  FaInstagram,
  FaYoutube,
  FaMedium,
  FaEnvelope,
}

export const iconOptions = Object.keys(iconRegistry).sort()

export function resolveIcon(iconClass: string | undefined | null): IconComponent {
  if (iconClass && iconRegistry[iconClass]) return iconRegistry[iconClass]
  return FaCode
}

export function Icon({ name, ...props }: { name: string } & IconBaseProps) {
  const Cmp = resolveIcon(name)
  return <Cmp {...props} />
}
