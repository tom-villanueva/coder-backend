import { UserService } from "../../services/index.js";

const exists = (documents, filename) => {
  const document = documents.find(
    (document) => document.name.split(".")[0] === filename
  );

  if (!document) {
    return false;
  }

  return true;
};

const renderProfileController = async (req, res, next) => {
  const { documents } = await UserService.getUserById(req.session.user._id);

  const user = {
    id: req.session.user._id,
    email: req.session.user.email,
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    age: req.session.user.age,
    hasIdentification: exists(documents, "identification"),
    hasResidence: exists(documents, "residence"),
    hasAccountState: exists(documents, "account_state"),
  };

  res.render("profile", { user: user });
};

export default renderProfileController;
