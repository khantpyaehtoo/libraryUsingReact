// themecontext
import { createContext, useReducer } from "react";

const ThemeContext = createContext();

let ThemeReducer = (state, action) => {
    // console.log(state, action);
    switch (action.type) {
        case "CHANGE_THEME":
            return { ...state, theme: action.payload }; // { ပထမဆုံး 'spread operator' နဲ့ default state ကို လှမ်းခေါ်တယ် ပြီးတော့ theme ကို override လုပ်ချတယ် ပြီးတော့ action.payload ထဲက value ကိုယူတယ် အဲ့မှာ dark ဆိုတဲ့ ကောင်လေး ဝင်လာပါတယ် object ရဲ့သဘောတရား အရ key နှစ်ခုက တူနေရင် ပထမတစ်ခုက override ဖြစ်သွားပြီး ဒုတိယတစ်ခုကိုပဲ ယူတယ် }
        default:
            return state; // {theme: 'light'}
    }
};

// themecontextprovider component
const ThemeContextProvider = ({ children }) => {
    let [state, dispatch] = useReducer(ThemeReducer, {
        theme: "light",
    });

    let changeTheme = (theme) => {
        // action -> type + payload -> {type, payload}
        dispatch({ type: "CHANGE_THEME", payload: theme });
    };

    const isDark = state.theme === "dark";

    return (
        <ThemeContext.Provider value={{ ...state, changeTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeContextProvider };
