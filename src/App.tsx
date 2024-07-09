import "@picocss/pico/css/pico.violet.min.css"
import Header from "./components/Header"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import MainBody from "./pages/MainBody"
import MyUtmi from "./pages/MyUtmi"
import { AuthProvider } from "./context/AuthContext"
import MyInfo from "./pages/MyInfo"
import { UserProvider } from "./context/UserContext"
import SideBar from "./components/SideBar"
import TmiMapPage from "./pages/TmiMapPage"

function App() {
    return (
        <>
            <AuthProvider>
                <UserProvider>
                    <div id="portal" />
                    <BrowserRouter>
                        <main className="container">
                            <Header />
                            <SideBar />
                            <div className="margin-left">
                                <Routes>
                                    <Route index={true} element={<MainBody />} />
                                    <Route path="/MyUtmi" element={<MyUtmi />} />
                                    <Route path="/MyInfo" element={<MyInfo />} />
                                    <Route path="/tmiMap/:id" element={<TmiMapPage />} />
                                </Routes>
                            </div>
                        </main>
                    </BrowserRouter>
                </UserProvider>
            </AuthProvider>
        </>
    )
}

export default App
