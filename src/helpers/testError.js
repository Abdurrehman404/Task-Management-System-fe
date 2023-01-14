import axios from "axios";

const testError = (totalFormData, validData) => {
  return new Promise((resolve, reject) => {
    async function testingError() {
      let re = "";
      for (let fieldName in validData) {
        switch (fieldName) {
          case "email":
            re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            validData["email"] = !re.test(totalFormData["email"]);
            if (validData["email"] === false) {
              // Testing email validity
              async function emailTestFunc() {
                return new Promise((resolve, reject) => {
                  let emailAPIReq = async () => {
                    let res = await axios.get(
                      `https://emailvalidation.abstractapi.com/v1/?api_key=0b351dcbac4547eaa6fd61ba3a74ed83&email=${totalFormData["email"]}`
                    );
                    if (res.data.deliverability !== "DELIVERABLE") {
                      console.log(res);
                      validData["email"] = true;
                    }
                    resolve();
                  };
                  emailAPIReq();
                });
              }
              await emailTestFunc();
            }

            break;

          case "userName":
            re = /^\S*$/;
            validData["userName"] = !re.test(totalFormData["userName"]);
            break;

          case "name":
            re = /^[a-z ,.'-]+$/i;
            validData["name"] = !re.test(totalFormData["name"]);
            break;

          case "password":
            re = /^\S*$/;
            validData["password"] =
              !(totalFormData["password"].length >= 6) ||
              !re.test(totalFormData["password"]);
            break;

          case "newPassword":
            re = /^\S*$/;
            validData["newPassword"] =
              !(totalFormData["newPassword"].length >= 6) ||
              !re.test(totalFormData["newPassword"]);
            break;

          default:
            break;
        }
      }

      resolve(validData);
    }
    testingError();
  });
};

export default testError;
