import "@picocss/pico/css/pico.violet.min.css"
import Header from "./components/Header"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import MainBody from "./pages/MainBody"
import MyUtmi from "./pages/MyUtmi"
import { AuthProvider } from "./context/AuthContext"
import MyInfo from "./pages/MyInfo"
import FriendUtmi from "./pages/FriendUtmi"
import FriendUtmiById from "./pages/FriendUtmiById"
import { DataProvider } from "./context/DataContext"
import { DarkModeProvider } from "./context/DarkModeContext"
import ChangePassword from "./pages/ChangePassword"

function App() {
    return (
        <>
            <DarkModeProvider>
                <AuthProvider>
                    <DataProvider>
                        <div id="portal" />
                        <BrowserRouter>
                            <main className="container">
                                <Header />
                                <Routes>
                                    <Route index={true} element={<MainBody />} />
                                    <Route path="/my-utmi" element={<MyUtmi />} />
                                    <Route path="/my-info" element={<MyInfo />} />
                                    <Route path="/change-password" element={<ChangePassword />} />
                                    <Route path="/friend-utmi/" element={<FriendUtmi />} />
                                    <Route path="/friend-utmi/:id?" element={<FriendUtmiById />} />
                                </Routes>
                            </main>
                        </BrowserRouter>
                    </DataProvider>
                </AuthProvider>
            </DarkModeProvider>
        </>
    )
}

export default App
