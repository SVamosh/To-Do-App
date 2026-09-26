
import { useTheme } from "../context/ThemeProvider";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

const Header = () => {
    const {theme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <header className="sticky pt-5">
            <div className="wrapper">
                <div className="flex justify-between items-center">
                    <div className="font-bold">
                        ToDo App
                    </div>

                    <ToggleButtonGroup
                        color="warning"
                        className="mr-5"
                        value={theme}
                        exclusive
                        aria-label="Platform"
                        onClick={toggleTheme}
                    >
                        <ToggleButton value="light" sx={{color: "#FFFFFF"}}>
                            <LightModeIcon />
                        </ToggleButton>

                        <ToggleButton value="dark" sx={{color: "#FFFFFF"}}>
                            <NightlightIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
        </header>
    );
};

export default Header;