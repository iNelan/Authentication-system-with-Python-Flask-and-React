const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      auth: false,
      register: false,
    },
    actions: {
      // Registro
      registro: async (email, password, repeat) => {
        // fetching data from the backend
        if (password === repeat && email && password) {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          };
          try {
            const res = await fetch(
              process.env.BACKEND_URL + "/api/register",
              options
            );
            if (res.status === 200) {
              alert("You are now registered");
              setStore({
                register: true,
              });
            }
            const data = await res.json();
            setStore({
              register: false,
            });
          } catch (error) {
            console.log("Error loading message from backend", error);
            alert("Failed to register");
          }
        }
      },

      // Fetch para Login
      login: async (email, password) => {
        if (email !== "" && password != "") {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          };

          try {
            // fetching data from the backend
            const res = await fetch(
              process.env.BACKEND_URL + "/api/login",
              options
            );
            if (res.status === 200) {
              setStore({
                auth: true,
              });
            } else if (res.status === 401) {
              alert("User or Password error");
            }

            const data = await res.json();
            console.log(data);
            localStorage.setItem("token", data.token);
          } catch (error) {
            console.log("Error loading message from backend", error);
          }
        }
      },

      // Cerrar sesion
      logout: () => {
        localStorage.removeItem("token");
        setStore({
          auth: false,
        });
      },
    },
  };
};

export default getState;
