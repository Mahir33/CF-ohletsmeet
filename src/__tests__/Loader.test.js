import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Loader from "../components/Loader";
import App from "../App";

describe("<Loader /> component", () => {
    test("renders Vortex component with correct props", () => {
        render(<Loader />);
        const vortexElement = screen.getByRole("progressbar", { name: /vortex-loading/i });
        expect(vortexElement).toHaveAttribute("height", "80");
        expect(vortexElement).toHaveAttribute("width", "80");
        expect(vortexElement).toHaveAttribute("aria-label", "vortex-loading");
    });

    test("Loader disappears after 2 seconds", async () => {
        render(<App />);
        const loaderElement = screen.getByRole("progressbar", { name: /vortex-loading/i });
        expect(loaderElement).toBeInTheDocument();

        await waitFor(() => {
            expect(loaderElement).not.toBeInTheDocument();
        }, { timeout: 3000 });
    });
});