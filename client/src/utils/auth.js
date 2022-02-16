import decode from 'jwt-decode';
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    // const [addBadge] = useMutation(ADD_BADGE);
    // const streak = checkStreak(5);
    // console.log(streak);
    // if (streak) {
    //     addBadge({ variables: {badgeName: streak}})
    // }
    // window.location.assign('/');
    return true;
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();