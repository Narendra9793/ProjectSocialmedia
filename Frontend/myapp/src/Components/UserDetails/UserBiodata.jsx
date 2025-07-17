import React, { useEffect } from "react";
import "./UserDetails.css";
import { useUser } from "../../context/UserProvider";
import { FaUser, FaPhone, FaMapMarkerAlt, FaBirthdayCake } from "react-icons/fa";
import { GiLoveMystery, GiTalk } from "react-icons/gi";
import { MdWork, MdOutlineHeight, MdOutlineFamilyRestroom } from "react-icons/md";

const UserBiodata = () => {
  const [user] = useUser();

  useEffect(() => {
    console.log("User biodata", user);
  }, []);

  const displayField = (label, value, icon = null) => (
    <div className="profile-item">
      {icon && <span className="icon">{icon}</span>}
      <strong>{label}:</strong> {value || <i>Not provided</i>}
    </div>
  );
  const handleEdit = ()=>{
     document.getElementById("user-biodata").style.display='none';
     document.getElementById("biodata-div").style.display='flex';
  }

  return (
    <div className="user-biodata" id="user-biodata">
      <div className="basic-info">
        <button type="button" onClick={handleEdit}>Edit</button>
        <div className="profile-pic">
          <img src={user.imageUrl} alt="Profile" />
        </div>
        <div className="quick-info">
          <h2>{user.firstName} {user.lastName}</h2>
          <p>Nickname: {user.nickName || <i>Not provided</i>}</p>
          <p>Gender: {user.gender}</p>
          <p>DOB: {user.dob}</p>
        </div>
      </div>

      <div className="biodata-section">
        <h3>Personal Info</h3>
        {displayField("Phone", user.phoneNumber, <FaPhone />)}
        {displayField("Address", user.address, <FaMapMarkerAlt />)}
        {displayField("Marital Status", user.maritalStatus, <FaUser />)}
      </div>

      <div className="biodata-section">
        <h3>👨‍👩‍👧 Family</h3>
        {displayField("Father's Name", user.fatherName, <MdOutlineFamilyRestroom />)}
        {displayField("Mother's Name", user.motherName, <MdOutlineFamilyRestroom />)}
        {displayField("Siblings", user.siblings, <MdOutlineFamilyRestroom />)}
      </div>

      <div className="biodata-section">
        <h3>🎓 Education & Work</h3>
        {displayField("Highest Education", user.highestEducation)}
        {displayField("Employer Name", user.employerName, <MdWork />)}
        {displayField("Annual Income", user.annualIncome)}
      </div>

      <div className="biodata-section">
        <h3>💖 Lifestyle</h3>
        {displayField("Height", user.height, <MdOutlineHeight />)}
        {displayField("Complexion", user.complexion)}
        {displayField("Body Type", user.bodyType)}
        {displayField("Religion", user.religion)}
        {displayField("Smoking Habit", user.smokingHabit)}
        {displayField("Drinking Habit", user.drinkingHabit)}
      </div>

      <div className="biodata-section">
        <h3>🍲 Interests</h3>
        {displayField("Love to Eat", user.loveToEat, <GiLoveMystery />)}
        {displayField("Hobbies & Interests", user.hobbiesAndInterests)}
        {displayField("Activities They Enjoy", user.activitiesTheyEnjoy, <GiTalk />)}
      </div>

      <div className="biodata-section">
        <h3>❤️ Partner Preferences</h3>
        {displayField("Preferred Min Age", user.leastAge)}
        {displayField("Preferred Max Age", user.mostAge)}
        {displayField("Preferred Qualification", user.preferredQualification)}
        {displayField("Preferred Occupation", user.preferredOccupation)}
        {displayField("Preferred Place", user.preferredPlace)}
        {displayField("Preferred Contact Mode", user.preferredModeOfContact)}
      </div>

      <div className="biodata-section">
        <h3>📝 About Myself</h3>
        <p>{user.aboutMyself || <i>Not provided</i>}</p>
      </div>
    </div>
  );
};

export default UserBiodata;
