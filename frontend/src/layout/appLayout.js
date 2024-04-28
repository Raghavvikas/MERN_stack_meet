import Header from "../component/Header"
import Footer from "../component/Footer"
function AppLayout({ children }) {
    return <>
        <Header />
            <div className="main">
                {children}
            </div>
        <Footer />
    </>
}
export default AppLayout