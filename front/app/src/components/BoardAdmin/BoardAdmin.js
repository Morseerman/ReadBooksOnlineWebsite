import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import AuthService from "../../services/auth.service";
import BillService from "../../services/BillService";
import { Button } from "bootstrap";
import { FormattedMessage } from "react-intl";
import ExistingUserService from "../../services/existing-user.service";

const BoardAdmin = () => {
  const currentUser = AuthService.getCurrentUser();
  const [content, setContent] = useState("");
  const [bills, setBills] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentBill, setCurrentBill] = useState(null);
  // const [billStatus, setCurrentBillStatus] = useState("");
  //test

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent("Bills");
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent("Invalid Access");
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    retrieveBills();
    retrieveUsers();
    mapBills();
  }, [content]);

  const retrieveBills = async () => {
    await BillService.getAll().then((response) => {
      const arr = Object.entries(response.data);
      setBills(arr);
    });
  };

  const retrieveUsers = async () => {
    await ExistingUserService.getAll().then((response) => {
      const arr = Object.entries(response.data);
      setUsers(arr);
    });
  };

  const mapBills = () => {
    bills > 0 && bills.map((bill, index) => {});
  };

  const retrieveBillNo = (bill) => {
    return bill.no;
  };

  const retrieveBillDate = (bill) => {
    return bill.date;
  };

  const retrieveBillType = (bill) => {
    return bill.type;
  };

  const retrieveBillAmount = (bill) => {
    return "£" + bill.amount;
  };

  // const getUserName = (userId) => {
  //   ExistingUserService.getByUserId(userId).then((res) => {
  //     return res.data.username;
  //   });
  // };

  // const retrieveBillUser = (bill) => {
  //   // console.log(bill.user);
  //   // let user;
  //   // ExistingUserService.getByUserId(bill.user[0]).then((res) => {
  //   //   console.log(res.data.username);
  //   //   return res.data.username;
  //   // });

  //   return getUserName(bill.user[0]);
  // };

  const retrieveUserName = (bill) => {
    for (const user of users) {
      console.log("bills user id: " + bill.user[0]);
      console.log("users id: " + user[1]._id);
      if (bill.user[0] === user[1]._id) {
        return user[1].username;
      } else {
      }
    }
  };

  const retrieveBillIsPaid = (bill) => {
    const boolVal = bill.isPaid;
    if (boolVal) {
      return (
        <FormattedMessage id="boardUser.paidStatus" defaultMessage="Paid" />
      );
    } else {
      return (
        <FormattedMessage
          id="boardUser.unPaidStatus"
          defaultMessage="Waiting for Payment"
        />
      );
    }
  };

  // const canEdit = (request) => {
  //   console.log(request[1]);
  //   if (
  //     request[1].state[0] === "620f227f5a6cfa6ef8038ecb" ||
  //     request[1].state[0] === "620f227f5a6cfa6ef8038ecd"
  //   ) {
  //     // return <button className="btn btn-secondary">Edit</button>;
  //     return (
  //       // <Link
  //       //   to={`/request/${request[1]._id}`}
  //       //   type="button"
  //       //   className="btn btn-secondary"
  //       // >
  //       //   Edit
  //       // </Link>
  //     );
  //   } else {
  //   }
  // };

  const canPay = (bill) => {
    if (!bill.isPaid) {
      return (
        <button className="btn btn-success" onClick={() => payBill(bill)}>
          <FormattedMessage id="boardUser.payButton" defaultMessage="Pay" />
        </button>
      );
    } else {
    }
  };

  const payBill = async (bill) => {
    bill.isPaid = true;
    await BillService.update(bill._id, bill).then((response) => {
      setContent("1");
    });
  };

  // const retrieveUser = (bill) => {
  //   ExistingUserService.getByUserId(bill.user[0]).then((response) => {
  //     return response.user.username;
  //   });
  // };

  // const retrieveUserBill = (bill) => {
  //   // console.log(bill.user[0]);
  //   // await ExistingUserService.getByUserId(bill.user[0])
  //   //   .then((res) => {
  //   //     // console.log(res.user.username);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   const user = retrieveUser(bill);
  //   return user.username;
  // };

  const renderBills = () => {
    return bills.map((bill) => (
      <tr>
        <th scope="row">{retrieveBillNo(bill[1])}</th>
        <td>{retrieveBillDate(bill[1])}</td>
        <td>{retrieveBillType(bill[1])}</td>
        <td>{retrieveBillAmount(bill[1])}</td>
        <td>{retrieveBillIsPaid(bill[1])}</td>
        <td>{retrieveUserName(bill[1])}</td>
      </tr>
    ));
  };

  const retrieveUserBill = async (bill) => {
    console.log(bill.user[0]);
    await ExistingUserService.getByUserId(bill.user[0]).then((res) => {
      return res.data.username;
      console.log(res.data.username);
    });
  };

  // return (
  //   <div>
  //     {currnetUser ? (
  //       <h1>Bills</h1>
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th scope="col">No.</th>
  //             <th scope="col">Date</th>
  //             <th scope="col">Type</th>
  //             <th scope="col">Amount</th>
  //             <th scope="col">Status</th>
  //           </tr>
  //         </thead>
  //         <tbody>{renderBills()}</tbody>
  //       </table>
  //     )}

  // ) : (
  //   <Redirect to="/login" />
  // )
  // </div>

  return (
    <div data-testid="form-render">
      {currentUser ? (
        <div>
          <h1>
            <FormattedMessage id="boardUser.title" defaultMessage="Bills" />
          </h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.noHeader"
                    defaultMessage="No."
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.dateHeader"
                    defaultMessage="Date"
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.typeHeader"
                    defaultMessage="Type"
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.amountHeader"
                    defaultMessage="Amount"
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.statusHeader"
                    defaultMessage="Status"
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.statusHeader"
                    defaultMessage="User"
                  />
                </th>
              </tr>
            </thead>
            <tbody>{renderBills()}</tbody>
          </table>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default BoardAdmin;
