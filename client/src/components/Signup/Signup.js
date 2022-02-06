const Signup = () => {
    return (
        <form>
            <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
            />
            <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
            />
            <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                id="password"
            />
            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default Signup;