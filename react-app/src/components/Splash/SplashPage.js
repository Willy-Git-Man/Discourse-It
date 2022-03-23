import Footer from "../../components/Footer/footer";
import LoginForm from "../../components/auth/LoginModal/LoginForm";
// import SignupModal from "../components/auth/SignupModal/index";

import './SplashPage.css'

function SplashPage() {

  return (
    <div className="SplashMainDiv">
 {/* <LoginFormModal /> */}
 <LoginForm />
 {/* <SignupModal /> */}
 <Footer />
    </div>
  );
}
export default SplashPage;
