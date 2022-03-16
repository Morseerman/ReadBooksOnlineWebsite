import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import AuthService from "../../services/auth.service";
import BillService from "../../services/BillService";
import { Button } from "bootstrap";
import { FormattedMessage } from "react-intl";

const BoardUser = () => {
  const currentUser = AuthService.getCurrentUser();
  const [content, setContent] = useState("");
  const [bills, setBills] = useState([]);
  const [currentBill, setCurrentBill] = useState(null);
  // const [billStatus, setCurrentBillStatus] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
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
    mapBills();
  }, [content]);

  const retrieveBills = async () => {
    await BillService.getByUserId(currentUser.id).then((response) => {
      const arr = Object.entries(response.data);
      setBills(arr);
    });
  };

  const mapBills = () => {
    bills > 0 &&
      bills.map((bill, index) => {
        console.log(bill);
      });
  };

  const retrieveBillNo = (bill) => {
    console.log(bill.no);
    return bill.no;
  };

  const retrieveBillDate = (bill) => {
    console.log(bill.date);
    return bill.date;
  };

  const retrieveBillType = (bill) => {
    console.log(bill.type);
    return bill.type;
  };

  const retrieveBillAmount = (bill) => {
    console.log(bill.amount);
    return "£" + bill.amount;
  };

  const retrieveBillIsPaid = (bill) => {
    console.log(bill.isPaid);
    const boolVal = bill.isPaid;
    if (boolVal) {
      console.log("returning paid status");
      return (
        <FormattedMessage id="boardUser.paidStatus" defaultMessage="Paid" />
      );
    } else {
      console.log("returning waiting for payment status");
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
    console.log(bill.isPaid);
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
    console.log(bill._id);
    bill.isPaid = true;
    await BillService.update(bill._id, bill).then((response) => {
      console.log("Bill has been paid");
      setContent("1");
    });
  };

  const renderBills = () => {
    return bills.map((bill) => (
      <tr>
        <th scope="row">{retrieveBillNo(bill[1])}</th>
        <td>{retrieveBillDate(bill[1])}</td>
        <td>{retrieveBillType(bill[1])}</td>
        <td>{retrieveBillAmount(bill[1])}</td>
        <td>{retrieveBillIsPaid(bill[1])}</td>
        <td>{canPay(bill[1])}</td>
      </tr>
    ));
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
            <FormattedMessage id="boardUser.title" defaultMessage="aaa" />
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

export default BoardUser;
