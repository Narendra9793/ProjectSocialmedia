import React from 'react'
import './UpdateDetails.css'
const UpdateDetails = () => {
  return (
    <>
        <form action="" method="post">
        
            <div className="me">
                <input type="file" name="img" id="img" />
                <input type="text" name="firstName" id="firstName" placeholder='First Name' />
                <input type="text" name="lastName" id="lastName" placeholder='Last Name' />
                <input type="text" name="nickName" id="nickName" placeholder='Nick Name' />
                <legend>Choose your gender:</legend>
                <label for="male">Male</label>
                <input type="radio" name="gender" id="male" value="male" checked/>
                <label for="female">Female</label>
                <input type="radio" name="gender" id="female" value="female"/>

                <input type="email" name="nickName" id="nickName" placeholder='Nick Name' />
                <input type="password" name="nickName" id="nickName" placeholder='Nick Name' />
                <input type="number" name="phone" id="phone" placeholder='Phone no.' />
                <input type="text" name="address" id="address" placeholder='Your City will be Enough.' />
                <input type="text" name="dob" id="dob" placeholder='dd/mm/yyyy' />
    
                <label for="Qualification">Choose your Qualification:</label>
                <select name="Qualification" id="Qualification">
                    <option value="Bachelor of Technology ">Bachelor of Technology </option>
                    <option value="Bachelor of Science">Bachelor of Science</option>
                    <option value="Bachelor of Commerce">Bachelor of Commerce</option>
                    <option value="Bachelor of Arts">Bachelor of Arts</option>
                    <option value="Bachelor of Business Administration ">Bachelor of Business Administration </option>
                </select>
            </div>

            <div className="occupation">
               <input type="text" name="employer_name" id="employer_name" placeholder='Employer Name' />
               <input type="text" name="annual_income" id="annual_income" placeholder="Annual income in LPA" />
            </div>

            <div className="my-life">
                <legend>Choose your Marital Status:</legend>
                <label for="Married">Married</label>
                <input type="radio" name="marital_status" id="marital_status" value="Married" checked/>
                <label for="Unmarried">Unmarried</label>
                <input type="radio" name="marital_status" id="marital_status" value="Unmarried"/>
                <label for="Divorcie">Divorcie</label>
                <input type="radio" name="marital_status" id="marital_status" value="Divorcie"/>
                <textarea name="aboutMe" id="aboutMe" cols="30" rows="10" placeholder='Write about Yourself'/>
            </div>

    

            <div className="my-family">
                <input type="text" name="mother_name" id="mother_name" placeholder="Mother Name" />
                <input type="text" name="father_name" id="father_name" placeholder="Father Name" />
                <input type="number" name="siblings" id="siblings" placeholder="number of siblings" />
            </div>


 

            <div className="my-body">
                <input type="number" name="height" id="height" placeholder="Height in cm" />

                <label for="complexion">Choose your complexion:</label>
                <select name="complexion" id="complexion">
                    <option value="Fair or Light Complexion">Fair or Light Complexion</option>
                    <option value="Wheatish or Medium Complexion">Wheatish or Medium Complexion</option>
                    <option value="Dusky or Olive Complexion">Dusky or Olive Complexion</option>
                    <option value="Dark Complexion">Dark Complexion</option>
                    <option value="Ebony or Deep Complexion">Ebony or Deep Complexion</option>
                </select>
                <label for="body_type">Choose your Body type:</label>
                <select name="body_type" id="body_type">
                    <option value="Ectomorph">Ectomorph</option>
                    <option value="Mesomorph">Mesomorph</option>
                    <option value="Endomorph">Endomorph</option>
                    <option value="Lean">Lean</option>
                    <option value="Athletic">Athletic</option>
                </select>
                <label for="religion">Choose your religion:</label>
                <select name="religion" id="religion">
                    <option value="Hinduism">Hinduism</option>
                    <option value="Islam">Islam</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Sikhism">Sikhism</option>
                    <option value="Jainism:">Jainism:</option>
                </select>
                <label for="smoking_habbit">Choose your smoking habbit:</label>
                <select name="smoking_habbit" id="smoking_habbit">
                    <option value="Occasional Smokers">Occasional Smokers</option>
                    <option value="Chain Smokers:">Chain Smokers:</option>
                    <option value="Light Smokers">Light Smokers</option>
                    <option value="Quitters/Former Smokers">Quitters/Former Smokers</option>
                    <option value="Nonsmoker">Nonsmoker</option>
                </select>
                <label for="drinking_habbit">Choose your drinking habbit:</label>
                <select name="drinking_habbit" id="drinking_habbit">
                    <option value="Occasional Drinker">Occasional Drinker</option>
                    <option value="Moderate Drinker">Moderate Drinker</option>
                    <option value="Heavy Drinker">Heavy Drinker</option>
                    <option value="Binge Drinker">Binge Drinker</option>
                    <option value="Nondrinker">Nondrinker</option>
                </select>
                <label for="Qualification">Choose your Qualification:</label>
                <select name="Qualification" id="Qualification">
                    <option value="Bachelor of Technology ">Bachelor of Technology </option>
                    <option value="Bachelor of Science">Bachelor of Science</option>
                    <option value="Bachelor of Commerce">Bachelor of Commerce</option>
                    <option value="Bachelor of Arts">Bachelor of Arts</option>
                    <option value="Bachelor of Business Administration ">Bachelor of Business Administration </option>
                </select>
                <label for="Qualification">Choose your Qualification:</label>
                <select name="Qualification" id="Qualification">
                    <option value="Bachelor of Technology ">Bachelor of Technology </option>
                    <option value="Bachelor of Science">Bachelor of Science</option>
                    <option value="Bachelor of Commerce">Bachelor of Commerce</option>
                    <option value="Bachelor of Arts">Bachelor of Arts</option>
                    <option value="Bachelor of Business Administration ">Bachelor of Business Administration </option>
                </select>
                <label for="Qualification">Choose your Qualification:</label>
                <select name="Qualification" id="Qualification">
                    <option value="Bachelor of Technology ">Bachelor of Technology </option>
                    <option value="Bachelor of Science">Bachelor of Science</option>
                    <option value="Bachelor of Commerce">Bachelor of Commerce</option>
                    <option value="Bachelor of Arts">Bachelor of Arts</option>
                    <option value="Bachelor of Business Administration ">Bachelor of Business Administration </option>
                </select>
                private String loveToeat;
                private String hobbiesAndinterests;
                private String activitiesTheyenjoy;
            </div>


 
            <div className="my-prefference">
                <input type="number" name="leastAge" id="leastAge" placeholder="Least Age in years" />
                <input type="number" name="mostAge" id="mostAge" placeholder="Most Age in years" />

                <label for="preferredQualification">Choose your preferred Qualification:</label>
                <select name="preferredQualification" id="preferredQualification">
                    <option value="Bachelor of Technology ">Bachelor of Technology </option>
                    <option value="Bachelor of Science">Bachelor of Science</option>
                    <option value="Bachelor of Commerce">Bachelor of Commerce</option>
                    <option value="Bachelor of Arts">Bachelor of Arts</option>
                    <option value="Bachelor of Business Administration ">Bachelor of Business Administration </option>
                </select>

                <label for="preferredOcupation">Choose your preferred Ocupation:</label>
                <select name="preferredOcupation" id="preferredOcupation">
                    <option value="Medical Professionals">Medical Professionals</option>
                    <option value="Engineering Professionals">Engineering Professionals</option>
                    <option value="Banking and Finance Professionals">Banking and Finance Professionals</option>
                    <option value="Government Jobs">Government Jobs</option>
                    <option value="Teaching and Education">Teaching and Education</option>
                </select>

                <label for="preferredPlace">Choose your preferred place:</label>
                <select name="preferredPlace" id="preferredPlace">
                    <option value="Lucknow">Lucknow</option>
                    <option value="Banglore">Banglore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                </select>
                <label for="preferredModeofconact">Choose your preferred mode of conact:</label>
                <select name="preferredModeofconact" id="preferredModeofconact">
                    <option value="Email">Email</option>
                    <option value="Call">Call</option>
                    <option value="Video Call">Video Call</option>
                </select>
                <label for="preferredTimeforcontact">Choose your Preferred  time for contact:</label>
                <select name="Qualification" id="Qualification">
                    <option value="8:00 am to 10:00 am">8:00 am to 10:00 am</option>
                    <option value="2:00 pm to 4:00 pm">2:00 pm to 4:00 pm</option>
                    <option value="8:00 pm to 10:00 pm">8:00 pm to 10:00 pm</option>
                </select>
                
            </div>



        </form>
    </>
  )
}

export default UpdateDetails