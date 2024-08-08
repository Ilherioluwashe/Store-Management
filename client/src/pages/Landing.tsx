import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            store <span>management</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            efficitur tortor ante, in elementum neque pharetra et. Duis
            scelerisque turpis lorem, vehicula imperdiet felis imperdiet eu.
            Suspendisse sem augue, dapibus eu sodales non, ornare a nisl.
            Quisque sed odio ipsum. Sed at sem non velit cursus euismod. Quisque
            eget ex enim. Aliquam sed tellus quis enim pretium lacinia quis non
            justo. Etiam ut malesuada quam, ut pulvinar ex. Nam dignissim
            egestas ex a mollis. Vivamus molestie mi nec neque aliquam, vitae
            vestibulum sapien fermentum. Nam ornare velit et feugiat venenatis.
            Aenean nibh massa, mollis id nisl eu, fringilla vulputate enim.
            Vivamus sollicitudin tortor ac finibus vehicula. Praesent massa
            neque, pulvinar vel magna vitae, rutrum cursus felis.
          </p>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="management system" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
