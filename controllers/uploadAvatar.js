const uploadAvatar = (req, res) => {
  // Tutaj możesz obsłużyć zapis do bazy danych, przekształcenie danych itp.
  res.status(200).json({ message: "Avatar uploaded successfully" });
};

module.exports = uploadAvatar;
