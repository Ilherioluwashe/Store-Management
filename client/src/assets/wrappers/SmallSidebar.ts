import styled from 'styled-components'

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }
  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--primary-500);
  }
  .nav-category {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    transition: padding-left 0.3s ease-in-out;
  }

  .nav-category-btn {
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    font-size: 1.2rem;
    text-align: left;
    width: 100%;
  }

  .nav-category-links {
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: padding-left 0.3s ease-in-out;
  }

  .nav-category:hover {
    padding-left: 3rem;
    color: var(--primary-500);
    transition: var(--transition);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }
  .active {
    color: var(--primary-500);
  }
`
export default Wrapper
