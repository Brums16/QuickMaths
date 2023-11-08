import { Link } from "react-router-dom"

const Home = () => {
    return (
        <section id="home-main"><h1>Welcome to QuickMaths</h1>
        <div className="homepage-buttons">
            <h3>Click one of the games below to start playing!</h3>

        <Link to="/speed-sums"><button className="homepage-button">Speed Sums</button></Link>
        <Link to="/pick-a-card"><button className="homepage-button">Pick A Card</button></Link>
        <Link to="/transformation-station"><button className="homepage-button">Transformation Station</button></Link>
        
       
        </div>
        
        </section>
    )
}

export default Home