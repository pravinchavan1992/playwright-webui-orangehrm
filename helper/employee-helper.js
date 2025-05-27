import { Employee } from "../pages/employee.page";

//@ts-check
const {
    getLoginName,
    getEmployeeID,
    getFirstName,
    getMiddleName,
    getLastName,
  } = require("../utility/utilities.js");

export function getEmployeeData(withLogin){
    const option = {
        fName: getFirstName(),
        mName: getMiddleName(),
        lName: getLastName(),
        empId: getEmployeeID(),
      }
      if(withLogin){
        option.loginName = getLoginName()
      }
      return option;
}

/**
 * @param {Employee} employeePage
 * @param {any} option
 * @param {any} withLogin
 */
export async function createEmployee (employeePage, option, withLogin) {
    await employeePage.addEmployee(option, withLogin);
}