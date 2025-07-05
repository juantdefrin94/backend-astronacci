const db = require("../hellpers/service");

class User {

  static async findByEmail(email) {
    try {
      const [rows] = await db.query(
        'SELECT 1 FROM users WHERE email = ? LIMIT 1',
        [email]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }

  static async register(email, hashedPassword, name) {
    try {
      const sql = 'INSERT INTO users (email, password, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';
      const now = new Date(); // current date-time
      await db.query(sql, [email, hashedPassword, name, now, now]);
      return true;
    } catch (err) {
      console.error("❌ Register failed:", err);
      throw err;
    }
  }

  static async getContent(email) {
    try {
      // Step 1: Get max_content for the user
      const sqlLimit = `
        SELECT t.max_content
        FROM users u
        JOIN types t ON u.type = t.id
        WHERE u.email = ?
        LIMIT 1
      `;
      const [rows] = await db.query(sqlLimit, [email]);

      if (!rows.length || rows[0].max_content === 0) {
        return null; // No user or max_content is 0
      }

      const maxContent = rows[0].max_content;

      // Step 2: Build SQL for articles
      const sqlArticles = `
        SELECT * FROM contents
        WHERE type = 1
        ORDER BY id ASC
        ${maxContent !== 999 ? 'LIMIT ?' : ''}
      `;

      // Step 3: Build SQL for videos
      const sqlVideos = `
        SELECT * FROM contents
        WHERE type = 2
        ORDER BY id ASC
        ${maxContent !== 999 ? 'LIMIT ?' : ''}
      `;

      let articleRows, videoRows;

      if (maxContent !== 999) {
        [articleRows] = await db.query(sqlArticles, [maxContent]);
        [videoRows] = await db.query(sqlVideos, [maxContent]);
      } else {
        [articleRows] = await db.query(sqlArticles);
        [videoRows] = await db.query(sqlVideos);
      }

      return {
        articleRows,
        videoRows
      };

    } catch (error) {
      console.error("Failed to get content for user:", error);
      throw new Error("Failed to fetch user content");
    }
  }


  static async login(email, password) {
    try {
      const [rows] = await db.query(
        'SELECT 1 FROM users WHERE email = ? and password = ? LIMIT 1',
        [email, password]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }

}

module.exports = User;