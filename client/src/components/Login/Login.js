const Login = () => {
    <form>
        <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            id="email"
        />
        <input
            className="form-input"
            placeholder="******"
            name="password"
            type="password"
            id="password"
        />
        <button type="submit">
            Submit
        </button>
    </form>
}

export default Login