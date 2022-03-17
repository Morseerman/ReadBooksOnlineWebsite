import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import AuthService from "../../services/auth.service";
import BookRequestService from "../../services/BookRequestService";
import { Button } from "bootstrap";
import { FormattedMessage } from "react-intl";
import ExistingUserService from "../../services/existing-user.service";

const BoardAdmin = () => {
  const currentUser = AuthService.getCurrentUser();
  const [content, setContent] = useState("");
  const [bookrequests, setBookRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentBookRequest, setCurrentBookRequest] = useState(null);
  // const [bookrequestStatus, setCurrentBookRequestStatus] = useState("");
  //test

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent("BookRequests");
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
    retrieveBookRequests();
    retrieveUsers();
    mapBookRequests();
  }, [content]);

  const retrieveBookRequests = async () => {
    await BookRequestService.getAll().then((response) => {
      const arr = Object.entries(response.data);
      setBookRequests(arr);
    });
  };

  const retrieveUsers = async () => {
    await ExistingUserService.getAll().then((response) => {
      const arr = Object.entries(response.data);
      setUsers(arr);
    });
  };

  const mapBookRequests = () => {
    bookrequests > 0 && bookrequests.map((bookrequest, index) => {});
  };

  const retrieveBookRequestTitle = (bookrequest) => {
  
    return bookrequest.title;
  };

  const retrieveBookRequestAuthor = (bookrequest) => {
    
    return bookrequest.author;
  };

  const retrieveBookRequestDate = (bookrequest) => {
    
    return bookrequest.date;
  };

  const retrieveBookRequestAmount = (bookrequest) => {
    return "£" + bookrequest.amount;
  };

  // const getUserName = (userId) => {
  //   ExistingUserService.getByUserId(userId).then((res) => {
  //     return res.data.username;
  //   });
  // };

  // const retrieveBookRequestUser = (bookrequest) => {
  //   // console.log(bookrequest.user);
  //   // let user;
  //   // ExistingUserService.getByUserId(bookrequest.user[0]).then((res) => {
  //   //   console.log(res.data.username);
  //   //   return res.data.username;
  //   // });

  //   return getUserName(bookrequest.user[0]);
  // };

  const retrieveUserName = (bookrequest) => {
    for (const user of users) {
      console.log("bookrequests user id: " + bookrequest.user[0]);
      console.log("users id: " + user[1]._id);
      if (bookrequest.user[0] === user[1]._id) {
        return user[1].username;
      } else {
      }
    }
  };

  const retrieveBookRequestIsPaid = (bookrequest) => {
    const boolVal = bookrequest.isPaid;
    if (boolVal) {
      return (
        <FormattedMessage id="boardUser.paidStatus" defaultMessage="Complete" />
      );
    } else {
      return (
        <>
          <FormattedMessage
            id="boardUser.unPaidStatus"
            defaultMessage="Pending"
          />
          <button className="btn btn-success" onClick={() => handleBookRequest(bookrequest)}>
          <FormattedMessage id="boardUser.payButton" defaultMessage="Handle" />
         </button>
        </>
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

  const canPay = (bookrequest) => {
    if (!bookrequest.isPaid) {
      return (
        <button className="btn btn-success" onClick={() => handleBookRequest(bookrequest)}>
          <FormattedMessage id="boardUser.payButton" defaultMessage="Pay" />
        </button>
      );
    } else {
    }
  };

  const handleBookRequest = async (bookrequest) => {
    return(
      <div className="Popup">
        <button>close</button>
      </div>
    );

    bookrequest.isPaid = true;
    await BookRequestService.update(bookrequest._id, bookrequest).then((response) => {
      setContent("1");
    });
  };

  // const retrieveUser = (bookrequest) => {
  //   ExistingUserService.getByUserId(bookrequest.user[0]).then((response) => {
  //     return response.user.username;
  //   });
  // };

  // const retrieveUserBookRequest = (bookrequest) => {
  //   // console.log(bookrequest.user[0]);
  //   // await ExistingUserService.getByUserId(bookrequest.user[0])
  //   //   .then((res) => {
  //   //     // console.log(res.user.username);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   const user = retrieveUser(bookrequest);
  //   return user.username;
  // };

  const renderBookRequests = () => {
    return bookrequests.map((bookrequest) => (
      <tr>
        <th scope="row">{retrieveBookRequestTitle(bookrequest[1])}</th>
        <td>{retrieveBookRequestAuthor(bookrequest[1])}</td>
        <td>{retrieveBookRequestDate(bookrequest[1])}</td>
        <td>{retrieveBookRequestAmount(bookrequest[1])}</td>
        <td>{retrieveBookRequestIsPaid(bookrequest[1])}</td>
        <td>{retrieveUserName(bookrequest[1])}</td>
      </tr>
    ));
  };

  const retrieveUserBookRequest = async (bookrequest) => {
    console.log(bookrequest.user[0]);
    await ExistingUserService.getByUserId(bookrequest.user[0]).then((res) => {
      return res.data.username;
      console.log(res.data.username);
    });
  };

  // return (
  //   <div>
  //     {currnetUser ? (
  //       <h1>BookRequests</h1>
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
  //         <tbody>{renderBookRequests()}</tbody>
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
            <FormattedMessage id="boardUser.title" defaultMessage="BookRequests" />
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
            <tbody>{renderBookRequests()}</tbody>
          </table>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default BoardAdmin;
