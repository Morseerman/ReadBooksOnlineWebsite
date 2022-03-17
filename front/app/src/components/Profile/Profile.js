import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import AuthService from "../../services/auth.service";
import BookRequestService from "../../services/BookRequestService";
import { Button } from "bootstrap";
import { FormattedMessage } from "react-intl";

const Profile = () => {
  
  const currentUser = AuthService.getCurrentUser();
  const [content, setContent] = useState("");
  const [bookrequests, setBookRequests] = useState([]);
  const [currentBookRequest, setCurrentBookRequest] = useState(null);
  const [inputTitle, setInputTitle] = useState('') 
  const [inputAuthor, setInputAuthor] = useState('') 
  // const [bookrequestStatus, setCurrentBookRequestStatus] = useState("");
 
  useEffect(() => {
    UserService.getUserBoard().then(
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
    mapBookRequests();
  }, [content]);

  const retrieveBookRequests = async () => {
    await BookRequestService.getByUserId(currentUser.id).then((response) => {
      const arr = Object.entries(response.data);
      setBookRequests(arr);
    });
  };

  const mapBookRequests = () => {
    bookrequests > 0 &&
      bookrequests.map((bookrequest, index) => {
        console.log(bookrequest);
      });
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
   
    if (bookrequest.amount == 0) return "Pending"
    else return "£" + bookrequest.amount
   
  };

  const retrieveBookRequestIsHandled = (bookrequest) => {
    
    const boolVal = bookrequest.isPaid;
    if (boolVal) {      
      return (
        <FormattedMessage id="boardUser.paidStatus" defaultMessage="Complete" />
      );
    } else {
     
      return (
        <FormattedMessage
          id="boardUser.unPaidStatus"
          defaultMessage={"Pending"}
        />
        
      );
    }
  };

  const canPay = (bookrequest) => {
    console.log(bookrequest.isHandled);
    if (!bookrequest.isHandled) {
      return (
        <button className="btn btn-success" onClick={e => cancelRequest(bookrequest.title)}>
          <FormattedMessage id="boardUser.payButton" defaultMessage="Cancel" />
        </button>
      );
    } else {
    }
  };

  const cancelRequest = (title) => {
    
     BookRequestService.remove(title).then(e => {})
  }

  const payBookRequest = async (bookrequest) => {
    console.log(bookrequest._id);
    bookrequest.isHandled = true;
    await BookRequestService.update(bookrequest._id, bookrequest).then((response) => {
      console.log("BookRequest has been paid");
      setContent("1");
    });
  };

  const renderBookRequests = () => {
  
    return bookrequests.map((bookrequest) => (   
      <tr>
        <th scope="row">{retrieveBookRequestTitle(bookrequest[1])}</th>
        <td>{retrieveBookRequestAuthor(bookrequest[1])}</td>
        <td>{retrieveBookRequestDate(bookrequest[1])}</td>
        <td>{retrieveBookRequestAmount(bookrequest[1])}</td>
        <td>{retrieveBookRequestIsHandled(bookrequest[1])}</td>
        <td>{canPay(bookrequest[1])}</td>
      </tr>
    ));
  };

 const makeRequestButton = () => {
  const myBook = {
     title: inputTitle,
     author: inputAuthor,
     date: getFullDate(),
     amount: 0,
     isHandled: false,
     user: [currentUser.id]
   }
   
  BookRequestService.create(myBook)
 }

 const inputtingTitle = (e) => {
   setInputTitle(e.target.value)
 }
 const inputtingAuthor = (e) => {
  setInputAuthor(e.target.value)
  }

  let getFullDate = () => {
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <div data-testid="form-render">
      {currentUser ? (
        <div>
          <h1>
            <FormattedMessage id="boardUser.title" defaultMessage="Book Requests" />
          </h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.noHeader"
                    defaultMessage="Title"
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.dateHeader"
                    defaultMessage="Author"
                  />
                </th>
                <th scope="col">
                  <FormattedMessage
                    id="boardUser.typeHeader"
                    defaultMessage="Date"
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
            <tbody>{renderBookRequests()}</tbody>
          </table>
          <button className="btn btn-success" onClick={makeRequestButton}>Make Request</button>
          <h3>Title</h3>
          <input 
         value={inputTitle}
         onChange={inputtingTitle}             
        />
          <h3>Author</h3>
          <input 
         value={inputAuthor}
         onChange={inputtingAuthor}             
        />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default Profile;
