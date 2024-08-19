export interface DashboardContextType {
  user: { name: string; avatar?: string }
  showSidebar: boolean
  isDarkTheme: boolean
  toggleDarkTheme: () => void
  toggleSidebar: () => void
  logoutUser: () => Promise<void>
}
