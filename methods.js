let { AgeFromDateString } = require("age-calculator");
//getting number of males and femals in the profiles
const genderCount = (profiles = []) => {
  if (Array.isArray(profiles) && profiles.length > 0) {
    const males = profiles.filter(
      profile => profile[1].gender.toLowerCase() === "male"
    );
    const females = profiles.filter(
      profile => profile[1].gender.toLowerCase() === "female"
    );
    return {
      males: males.length,
      females: females.length
    };
  }
};
//looking for valid profiles
const getValidProfiles = (profiles = []) => {
  if (Array.isArray(profiles) && profiles.length > 0) {
    return profiles.filter(profile => {
      let {
        fname,
        lname,
        caseNumber,
        dateOfBirth,
        gender,
        countryOfOrigin
      } = profile[1];
      return (
        fname && lname && caseNumber && dateOfBirth && gender && countryOfOrigin
      );
    });
  }
};
//getting age group and males femals counts
// const calculateAge = (currentYear, yearOfBirth) => currentYear - yearOfBirth;
const maleAndFemaleCountByAgeGroup = (validProfiles = []) => {
  let [
    maleAgeCountUnder18,
    maleAgeCount18To24,
    maleAgeCount25To34,
    maleAgeCount35To44,
    maleAgeCount45To54,
    maleAgeCount55To64,
    maleAgeCountOver65
  ] = [0, 0, 0, 0, 0, 0, 0];
  let [
    femaleAgeCountUnder18,
    femaleAgeCount18To24,
    femaleAgeCount25To34,
    femaleAgeCount35To44,
    femaleAgeCount45To54,
    femaleAgeCount55To64,
    femaleAgeCountOver65
  ] = [0, 0, 0, 0, 0, 0, 0];
  if (Array.isArray(validProfiles) && validProfiles.length > 0) {
    let obj = {
      "18-": { males: 0, females: 0 },
      "18-24": { males: 0, females: 0 },
      "25-34": { males: 0, females: 0 },
      "35-44": { males: 0, females: 0 },
      "45-54": { males: 0, females: 0 },
      "55-64": { males: 0, females: 0 },
      "65+": { males: 0, females: 0 }
    };
    validProfiles.forEach(validProfile => {
      const { gender, dateOfBirth } = validProfile[1];
      let calculatedAge = new AgeFromDateString(dateOfBirth).age;
      switch (true) {
        case calculatedAge >= 18 && calculatedAge <= 24:
          if (gender.toLowerCase() === "male") {
            maleAgeCount18To24++;
          } else {
            femaleAgeCount18To24++;
          }
          obj["18-24"].males = maleAgeCount18To24;
          obj["18-24"].females = femaleAgeCount18To24;
          break;
        case calculatedAge >= 25 && calculatedAge <= 34:
          if (gender.toLowerCase() === "male") {
            maleAgeCount25To34++;
          } else {
            femaleAgeCount25To34++;
          }
          obj["25-34"].males = maleAgeCount25To34;
          obj["25-34"].females = femaleAgeCount25To34;
          break;
        case calculatedAge >= 35 && calculatedAge <= 44:
          if (gender.toLowerCase() === "male") {
            maleAgeCount35To44++;
          } else {
            femaleAgeCount35To44++;
          }
          obj["35-44"].males = maleAgeCount35To44;
          obj["35-44"].females = femaleAgeCount35To44;
          break;
        case calculatedAge >= 45 && calculatedAge <= 54:
          if (gender.toLowerCase() === "male") {
            maleAgeCount45To54++;
          } else {
            femaleAgeCount45To54++;
          }
          obj["45-54"].males = maleAgeCount45To54;
          obj["45-54"].females = femaleAgeCount45To54;
          break;
        case calculatedAge >= 55 && calculatedAge <= 64:
          if (gender.toLowerCase() === "male") {
            maleAgeCount55To64++;
          } else {
            femaleAgeCount55To64++;
          }
          obj["55-64"].males = maleAgeCount55To64;
          obj["55-64"].females = femaleAgeCount55To64;
          break;
        case calculatedAge >= 65:
          if (gender.toLowerCase() === "male") {
            maleAgeCountOver65++;
          } else {
            femaleAgeCountOver65++;
          }
          obj["65+"].males = maleAgeCountOver65;
          obj["65+"].females = femaleAgeCountOver65;
          break;
        default:
          key = "18-";
          if (gender.toLowerCase() === "male") {
            maleAgeCountUnder18++;
          } else {
            femaleAgeCountUnder18++;
          }
          obj[key].males = maleAgeCountUnder18;
          obj[key].females = femaleAgeCountUnder18;
      }
    });
    return obj;
  }
};
//calculate profiles details
const profilesData = (profiles = []) => {
  if (Array.isArray(profiles) && profiles.length > 0) {
    const totalNumberOfProfiles = profiles.length;
    let totalNumberOfValidProfiles;
    let numberOfMalesAndFemales;
    if (totalNumberOfProfiles) {
      const validProfiles = getValidProfiles(profiles);
      totalNumberOfValidProfiles = validProfiles.length;
      numberOfMalesAndFemales = genderCount(validProfiles);
    }
    return {
      totalNumberOfProfiles,
      totalNumberOfValidProfiles,
      numberOfMalesAndFemales
    };
  }
};
const statsForVisualisation = ({ totalNumberOfValidProfiles } = {}, groupedData) => {
  if (totalNumberOfValidProfiles > 0) {
    const obj = {
      questionOneBarchart: {
        xAxisAgegroups: Object.keys(groupedData),
        yAxisMaleFemalePercentages: {}
      }
    };
    for (let key in groupedData) {
      obj.questionOneBarchart.yAxisMaleFemalePercentages[key] = {
        males:
          (groupedData[key].males * 100) / totalNumberOfValidProfiles + "%",
        females:
          (groupedData[key].females * 100) / totalNumberOfValidProfiles + "%"
      };
    }
    return obj;
  }
};
module.exports = {
  genderCount,
  getValidProfiles,
  maleAndFemaleCountByAgeGroup,
  profilesData,
  statsForVisualisation
};
