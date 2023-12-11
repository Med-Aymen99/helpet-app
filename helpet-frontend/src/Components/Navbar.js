import React, { useContext } from "react"
import helpetLogo from "../images/helpet.png"
import {Link} from "react-router-dom";
import { AuthContext } from "../utils/auth/AuthContext";
import { NavigationContext } from "../context/NavigationContext";
import useApi from './../utils/api';
import { PetContext } from './../context/PetContext';

export default function Navbar(props) {


	const {auth, handleLogout} = useContext(AuthContext);
    let navigate = useContext(NavigationContext);  
  
	const goHome = () => {
		navigate('/')
		window.location.reload();
	}
	const user = auth.user || JSON.parse(localStorage.getItem('user'))
	
	console.log("isAuthenticated :",auth.isAuthenticated)

	return (
		<nav className="nav--bar">
	
				<img
					className="nav--logo"
					src= {helpetLogo}
					alt= "helpet-logo"
					onClick={() => goHome()}
				/>

			
			<div className="buttons">
				<div>
					{auth.isAuthenticated &&
							<Link to="/CreatePost" className="Link-class">
								<button className="nav--button create-post-button">
									Give up for adoption
								</button>
							</Link>
					}
							<Link to="/about" className="Link-class">
								<button className="nav--button">
									About Us
								</button>
							</Link>
				</div>
				<div>
					{!auth.isAuthenticated &&
						<>
							<Link to="/Login" className="Link-class">
								<button className="nav--button">
									Login
								</button>
							</Link>
							<Link to="/SignUp" className="Link-class">
								<button className="nav--button">
									Sign up
								</button>
							</Link>
						</>
					}
					{auth.isAuthenticated &&
						<>
							<h4 className="nav-welcome">Hi {user.username}</h4>
								<Link to="/MyProfile" className="Link-class" >
							<button className="nav--button" >
									MyProfile
							</button>
								</Link>
							<button className="nav--button"
									onClick={ () => {handleLogout(); goHome()} }>
								Logout
							</button>
						</>
					}
				</div>
		    </div>
		</nav>

	)
}
