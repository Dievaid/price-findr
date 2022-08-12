import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

test("Check if navbar displays correctly when not logged in", async () => {
    render(<Navbar isLoggedIn={false}/>);
    expect(await screen.findByRole('button', {name: "Login"})).toBeDefined();
    expect(await screen.findByRole('button', {name: "Register"})).toBeDefined();
});

test("Check if navbar displays correctly when logged in", async () => {
    render(<Navbar isLoggedIn={true}/>);
    expect(await screen.findByRole('button', {name: "Logout"})).toBeDefined();
});