import React, { useEffect, useState } from "react";
import "./UserDetails.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/UserProvider";

const UpdateDetails = () => {
  const [user, setUser] = useUser();
  const [formData, setFormData] = useState({
    nickName: `${user.nickName}`,
    gender: `${user.gender}`,
    dob: `${user.dob}`,
    maritalStatus: `${user.maritalStatus}`,
    phoneNumber: `${user.phoneNumber}`,
    address: `${user.address}`,
    motherName: `${user.motherName}`,
    fatherName: `${user.fatherName}`,
    siblings: `${user.siblings}`,
    highestEducation: `${user.highestEducation}`,
    employerName: `${user.employerName}`,
    annualIncome: `${user.annualIncome}`,
    height: `${user.height}`,
    complexion: `${user.complexion}`,
    bodyType: `${user.bodyType}`,
    religion: `${user.religion}`,
    smokingHabit: `${user.smokingHabit}`,
    drinkingHabit: `${user.drinkingHabit}`,
    loveToEat: `${user.loveToEat}`,
    hobbiesAndInterests: `${user.hobbiesAndInterests}`,
    activitiesTheyEnjoy: `${user.activitiesTheyEnjoy}`,
    leastAge: `${user.leastAge}`,
    mostAge: `${user.mostAge}`,
    preferredQualification: `${user.preferredQualification}`,
    preferredOccupation: `${user.preferredOccupation}`,
    preferredPlace: `${user.preferredPlace}`,
    aboutMyself: `${user.aboutMyself}`,
    preferredModeOfContact: `${user.preferredModeOfContact}`,
  });
  const selectFields = {
    gender: ["Male", "Female", "Other"],
    maritalStatus: ["Single", "Married", "Divorced", "Widowed"],
    siblings: [...Array(10).keys()], // 0 to 9
    highestEducation: ["High School", "Bachelor's", "Master's", "PhD", "Other"],
    complexion: ["Fair", "Wheatish", "Dark"],
    bodyType: ["Slim", "Athletic", "Average", "Heavy"],
    religion: ["Hindu", "Muslim", "Christian", "Sikh", "Other"],
    smokingHabit: ["No", "Occasionally", "Yes"],
    drinkingHabit: ["No", "Occasionally", "Yes"],
    leastAge: Array.from({ length: 18 }, (_, i) => i + 18),
    mostAge: Array.from({ length: 22 }, (_, i) => i + 25),
    preferredModeOfContact: ["Phone", "Email", "WhatsApp"],
    preferredTimeForContact: ["Morning", "Afternoon", "Evening", "Night"],
    preferredQualification: ["Bachelor's", "Phd", "Masters"],
    preferredPlace: ["Religious Place", "Home", "Restraunt", "Club"],
    preferredOccupation: [
      "Government Empolyee",
      "Banker",
      "Businessman",
      "Charity worker",
    ],
  };

  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchuser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    console.log("User to Update: ", user.userId);
    try {
      setIsUpdating(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/update-profile/${user.userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchuser();
      toast.success(`${response.data}`, { icon: "✅" });
      setIsUpdating(false);
    } catch (error) {
      console.log("Catch block of Update profile!", error);
      if (error.response) {
        toast.success(`Failed to Update profile!`, { icon: "❌" });
      }
    }
  };
  return (
    <div className="biodata-div">
      <form className="user-form ">
        {Object.entries(formData).map(([key, value]) => {
          const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());

          if (selectFields[key]) {
            return (
              <div key={key} className="form-group">
                <label htmlFor={key}>{label}:</label>
                <select
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                >
                  <option value="">{`Select ${label}`}</option>
                  {selectFields[key].map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            );
          } else {
            return (
              <div key={key} className="form-group">
                <label htmlFor={key}>{label}:</label>
                <input
                  type={
                    key.toLowerCase().includes("email")
                      ? "email"
                      : key.toLowerCase().includes("dob")
                      ? "date"
                      : "text"
                  }
                  id={key}
                  name={key}
                  placeholder={label}
                  value={value}
                  onChange={handleChange}
                />
              </div>
            );
          }
        })}

        <button className="submit-btn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateDetails;
