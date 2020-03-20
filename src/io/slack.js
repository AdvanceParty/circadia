const fetchUsersURL = '/api/getUsers';
const fetchUsers = async () => {
  try {
    const res = await fetch(fetchUsersURL);
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
