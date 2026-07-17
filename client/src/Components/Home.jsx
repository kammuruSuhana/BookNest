import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const styles = {

    page: {
      minHeight: "100vh",
      background: "linear-gradient(to bottom,#f8f3e8,#f8f2df)",
      fontFamily: "Arial, sans-serif"
    },

    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 45px",
      background: "#f8f3e8",
      boxShadow: "0 3px 12px rgba(0,0,0,.15)"
    },

    brand: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#8b3f00"
    },

    navBtns: {
      display: "flex",
      gap: "15px"
    },

    btn: {
      border: "none",
      color: "#fff",
      padding: "11px 22px",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "16px"
    },

    hero: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "50px 20px"
    },

    logo: {
      width: "320px",
      maxWidth: "90%",
      marginBottom: "30px"
    },

    title: {
      fontSize: "60px",
      color: "#8b3f00",
      fontWeight: "bold",
      marginBottom: "15px"
    },

    subtitle: {
      fontSize: "22px",
      color: "#555",
      lineHeight: "1.7",
      marginBottom: "35px"
    },

    explore: {
      background: "#d5ad76",
      color: "#3d2a16",
      border: "none",
      padding: "18px 40px",
      borderRadius: "40px",
      fontSize: "22px",
      fontWeight: "bold",
      cursor: "pointer"
    },

    section: {
      padding: "70px 30px",
      background: "#fbf8dc"
    },

    heading: {
      textAlign: "center",
      color: "#9a4d10",
      fontSize: "48px",
      marginBottom: "45px"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "30px",
      width: "85%",
      margin: "auto"
    },

    card: {
      background: "#ddb885",
      borderRadius: "18px",
      padding: "45px",
      textAlign: "center",
      boxShadow: "0 6px 15px rgba(0,0,0,.15)",
      cursor: "pointer"
    },

    emoji: {
      fontSize: "48px"
    },

    text: {
      marginTop: "15px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333"
    },

    footer: {
      textAlign: "center",
      padding: "35px"
    },

    contact: {
      background: "#9a4d10",
      color: "#fff",
      border: "none",
      padding: "16px 40px",
      borderRadius: "8px",
      fontSize: "20px",
      cursor: "pointer"
    }

  };

  return (

    <div style={styles.page}>

      {/* Navbar */}

      <div style={styles.navbar}>

        <div style={styles.brand}>
          BookNest
        </div>

        <div style={styles.navBtns}>

          <button
            style={{...styles.btn,background:"#9b0000"}}
            onClick={()=>navigate("/login")}
          >
            User
          </button>

          <button
            style={{...styles.btn,background:"#617b2d"}}
            onClick={()=>navigate("/seller-login")}
          >
            Seller
          </button>

          <button
            style={{...styles.btn,background:"#b56d35"}}
            onClick={()=>navigate("/admin-login")}
          >
            Admin
          </button>

        </div>

      </div>

      {/* Hero */}

      <div style={styles.hero}>

        {/* Place your generated logo inside public folder as logo.png */}

        <img
          src="/logo.png"
          alt="BookNest Logo"
          style={styles.logo}
        />

        <div style={styles.title}>
          The perfect escape: curled up in my booknest
        </div>

        <div style={styles.subtitle}>
          Discover captivating books, connect with passionate sellers,
          <br/>
          and fuel your love for reading — only at <b>BookNest</b>.
        </div>

        <button
          style={styles.explore}
          onClick={()=>navigate("/login")}
        >
          Start Exploring
        </button>

      </div>

      {/* Categories */}

      <div style={styles.section}>

        <div style={styles.heading}>
          Explore by Category
        </div>

        <div style={styles.grid}>

          <div style={styles.card}>
            <div style={styles.emoji}>📖</div>
            <div style={styles.text}>Fiction</div>
          </div>

          <div style={styles.card}>
            <div style={styles.emoji}>🔬</div>
            <div style={styles.text}>Science</div>
          </div>

          <div style={styles.card}>
            <div style={styles.emoji}>👤</div>
            <div style={styles.text}>Biography</div>
          </div>

          <div style={styles.card}>
            <div style={styles.emoji}>👶</div>
            <div style={styles.text}>Children's Books</div>
          </div>

        </div>

      </div>

      {/* Footer */}

      <div style={styles.footer}>

        <button style={styles.contact}>
          Contact Us
        </button>

      </div>

    </div>

  );

}