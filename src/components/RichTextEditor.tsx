import { useReducer, type KeyboardEvent } from "react";
import styles from "./RichTextEditor.module.scss";

type State = string;
type Action = string;

function reducer(state: State, action: Action): State {
    // Handle backspace action
    if (action === "BACKSPACE") {
        return state.slice(0, -1);
    }
    // Append other characters
    return state + action;
}

const initialState: State = "Rich text editor";

export function RichTextEditor() {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
        const { key } = e;

        // Handle backspace
        if (key === "Backspace") {
            e.preventDefault();
            dispatch("BACKSPACE");
            return;
        }

        // Handle return (Enter)
        if (key === "Enter") {
            e.preventDefault();
            dispatch("\n");
            return;
        }

        // Handle tab
        if (key === "Tab") {
            e.preventDefault();
            dispatch("\t");
            return;
        }

        // Handle space
        if (key === " ") {
            e.preventDefault();
            dispatch(" ");
            return;
        }

        // Handle letters (uppercase and lowercase)
        if (/^[a-zA-Z]$/.test(key)) {
            e.preventDefault();
            dispatch(key);
            return;
        }
    }

    return (
        <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
            {state}
        </div>
    );
}
