import Footer from "../../components/Footer/footer";
import LoginFormModal from "../../components/auth/LoginModal/index";
import SignupModal from "../../components/auth/SignupModal/index";

import './SplashPage.css'

function SplashPage() {

  return (
    <div className="SplashMainDiv">
 <LoginFormModal />
 <SignupModal />
 <Footer />
    </div>
  );
}
export default SplashPage;
