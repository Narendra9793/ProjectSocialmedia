import React, { useEffect, useState } from "react";
import "./UserBiodata.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/UserProvider";

const UserBiodata = () => {
  const [user, setUser]=useUser();
  const [formData, setFormData] = useState({
    nickName: `${user.nickName}`,
    gender:`${user.gender}`, 
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
    preferredTimeForContact: `${user.preferredTimeForContact}`,
  });
  const [isUpdating, setIsUpdating]=useState(false)


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
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    console.log("User to Update: ", user.userId);
    try {
      setIsUpdating(true);
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/update-profile/${user.userId}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
          return (
            <div key={key} className="form-group">
              <label htmlFor={key}>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </label>
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
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={value}
                onChange={handleChange}
              />
            </div>
          );
        })}

        <select name="gender" onChange={handleChange} value={formData.gender}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="maritalStatus"
          onChange={handleChange}
          value={formData.maritalStatus}
        >
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>

        <select
          name="siblings"
          onChange={handleChange}
          value={formData.siblings}
        >
          <option value="">Number of Siblings</option>
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        <select
          name="highestEducation"
          onChange={handleChange}
          value={formData.highestEducation}
        >
          <option value="">Highest Education</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="complexion"
          onChange={handleChange}
          value={formData.complexion}
        >
          <option value="">Complexion</option>
          <option value="Fair">Fair</option>
          <option value="Wheatish">Wheatish</option>
          <option value="Dark">Dark</option>
        </select>

        <select
          name="bodyType"
          onChange={handleChange}
          value={formData.bodyType}
        >
          <option value="">Body Type</option>
          <option value="Slim">Slim</option>
          <option value="Athletic">Athletic</option>
          <option value="Average">Average</option>
          <option value="Heavy">Heavy</option>
        </select>

        <select
          name="religion"
          onChange={handleChange}
          value={formData.religion}
        >
          <option value="">Religion</option>
          <option value="Hindu">Hindu</option>
          <option value="Muslim">Muslim</option>
          <option value="Christian">Christian</option>
          <option value="Sikh">Sikh</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="smokingHabit"
          onChange={handleChange}
          value={formData.smokingHabit}
        >
          <option value="">Smoking Habit</option>
          <option value="No">No</option>
          <option value="Occasionally">Occasionally</option>
          <option value="Yes">Yes</option>
        </select>

        <select
          name="drinkingHabit"
          onChange={handleChange}
          value={formData.drinkingHabit}
        >
          <option value="">Drinking Habit</option>
          <option value="No">No</option>
          <option value="Occasionally">Occasionally</option>
          <option value="Yes">Yes</option>
        </select>

        <select
          name="leastAge"
          onChange={handleChange}
          value={formData.leastAge}
        >
          <option value="">Preferred Minimum Age</option>
          {Array.from({ length: 18 }, (_, i) => i + 18).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>

        <select name="mostAge" onChange={handleChange} value={formData.mostAge}>
          <option value="">Preferred Maximum Age</option>
          {Array.from({ length: 22 }, (_, i) => i + 25).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>

        <select
          name="preferredQualification"
          onChange={handleChange}
          value={formData.preferredQualification}
        >
          <option value="">Preferred Qualification</option>
          <option value="High School">High School</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>

        <select
          name="preferredModeOfContact"
          onChange={handleChange}
          value={formData.preferredModeOfContact}
        >
          <option value="">Preferred Mode of Contact</option>
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>

        <select
          name="preferredTimeForContact"
          onChange={handleChange}
          value={formData.preferredTimeForContact}
        >
          <option value="">Preferred Time for Contact</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>

        <button className="submit-btn" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserBiodata;
