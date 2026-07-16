const emailTemp = ({ otp }) => {
  return `
  <div
    style="
      background:#0f172a;
      padding:40px 20px;
      font-family:Arial,sans-serif;
    "
  >

    <div
      style="
        max-width:550px;
        margin:auto;
        background:white;
        border-radius:20px;
        overflow:hidden;
      "
    >

      <div
        style="
          background:linear-gradient(135deg,#4f46e5,#7c3aed);
          padding:40px;
          text-align:center;
        "
      >
        <h1 style="margin:0;color:white">
          Damo Ecommerce
        </h1>

        <p style="color:#ddd6fe">
          Verification Code
        </p>
      </div>


      <div
        style="
          padding:40px;
          text-align:center;
        "
      >

        <h2
          style="
            color:#111827;
          "
        >
          Your OTP
        </h2>

        <div
          style="
            margin:30px auto;

            width:220px;

            padding:20px;

            border-radius:16px;

            background:#eef2ff;

            color:#4f46e5;

            font-size:40px;

            font-weight:bold;

            letter-spacing:10px;
          "
        >
          ${otp}
        </div>

        <p
          style="
            color:#64748b;
          "
        >
          This code expires in
          <b>5 minutes</b>
        </p>

      </div>

    </div>

  </div>
  `;
};

module.exports = {
  emailTemp,
};