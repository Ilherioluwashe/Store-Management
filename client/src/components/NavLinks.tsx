import { useDashboardContext } from '../pages/DashboardLayout'
import { NavLink } from 'react-router-dom'
import links from '../utils/links'
import { NavLinksProps } from '../dtos/navLinks.interface'
import { useState } from 'react'

const NavLinks = ({ isBigSidebar }: NavLinksProps) => {
  const { user, toggleSidebar } = useDashboardContext()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const handleToggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  return (
    <div className="nav-links">
      {Object.entries(links).map(([category, categoryLinks]) => (
        <div key={category} className="nav-category">
          <button
            className="nav-category-btn"
            onClick={() => handleToggleCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
          {openCategory === category && (
            <div className="nav-category-links">
              {categoryLinks.map((link) => (
                <NavLink
                  to={link.path}
                  key={link.text}
                  onClick={isBigSidebar ? undefined : toggleSidebar}
                  className="nav-link"
                  end
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default NavLinks
// import { useDashboardContext } from '../pages/DashboardLayout'
// import { NavLink } from 'react-router-dom'
// import links from '../utils/links'
// import { NavLinksProps } from '../dtos/navLinks.interface'

// const NavLinks = ({ isBigSidebar }: NavLinksProps) => {
//   const { user, toggleSidebar } = useDashboardContext()
//   return (
//     <div className="nav-links">
//       {links.map((link) => {
//         const { text, path } = link
//         return (
//           <NavLink
//             to={path}
//             key={text}
//             onClick={isBigSidebar ? undefined : toggleSidebar}
//             className="nav-link"
//             end
//           >
//             {text}
//           </NavLink>
//         )
//       })}
//     </div>
//   )
// }

// export default NavLinks
