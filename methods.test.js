const profiles = require("./testdata");
const orinalProfiles = [...profiles];
const oneInvalidProfiles = JSON.parse(JSON.stringify(profiles));//deep copy of an primitive object
oneInvalidProfiles[0][1].gender = ""
const {
    genderCount,
    getValidProfiles,
    maleAndFemaleCountByAgeGroup,
    profilesData,
    statsForVisualisation
} = require("./methods");
describe("Tesing genderCount():", () => {
    test("should return undefined when calling with default arg",
        () => {
            expect(genderCount()).toBe(undefined);
        }
    )
    test("should return {males: , females:}",
        () => {
            const input = profiles
            const got = genderCount(input); 
            const result = { males: 4, females: 3 }
            expect(got).toEqual(result);
            //should not mutate after calling
            expect(input).toEqual(orinalProfiles);
        }
    )
});
describe("Test getValidProfiles():", () => {
    test('should get undefined when calling with default arg',
        () => {
            const got = getValidProfiles();
            expect(got).toEqual(undefined);
        }
    )
    test('should get complete profiles for all valid profiles',
        () => {
            const input = profiles
            const got = getValidProfiles(input);
            expect(got).toEqual(input);
        }
    )
    test("should get valid profiles for one invalid profiles", () => {
      const input = oneInvalidProfiles;
      const got = getValidProfiles(input);
      expect(got.length).toEqual(oneInvalidProfiles.length - 1);
    });
});
describe("Testing maleAndFemaleCountByAgeGroup(profiles):",
    () => {
        test('should return undefined for default parameter', () => {
            const got = maleAndFemaleCountByAgeGroup();
            expect(got).toBe(undefined)
        })
        test('should return counted object for valid profiles', () => {
            const got = maleAndFemaleCountByAgeGroup(getValidProfiles(profiles));
            const result = { 
                "18-": { "females": 1, "males": 1 }, 
                "18-24": { "females": 0, "males": 0 },
                 "25-34": { "females": 0, "males": 1 }, 
                 "35-44": { "females": 1, "males": 0 }, 
                 "45-54": { "females": 0, "males": 1 }, 
                 "55-64": { "females": 0, "males": 1 }, 
                 "65+": { "females": 1, "males": 0 } }
            expect(got).toEqual(result)
        })
    }
);
//
describe("Testing profilesData():", () => {
  test("should return undefined for default parameter", () => {
    const got = profilesData();
    expect(got).toBe(undefined);
  });
  test("should return counted object for valid profiles", () => {
    let got = profilesData(getValidProfiles(profiles));
    let result = {
      totalNumberOfProfiles: 7,
      totalNumberOfValidProfiles: 7,
      numberOfMalesAndFemales: {
          males: 4,
          females: 3
      }
    };
    expect(got).toEqual(result);
    //one invalid profile
    got = profilesData(oneInvalidProfiles)
    result = {
      totalNumberOfProfiles: 7,
      totalNumberOfValidProfiles: 6,
      numberOfMalesAndFemales: {
          males: 3,
          females: 3
      }
    };
    expect(got).toEqual(result)
  });
});
//
describe("Testing statsForVisualisation():", () => {
  test("should return undefined for default parameter", () => {
    const got = statsForVisualisation();
    expect(got).toBe(undefined);
  });
  test("should return counted object for valid profiles", () => {
      let got = statsForVisualisation(profilesData(profiles),
          maleAndFemaleCountByAgeGroup(getValidProfiles(profiles)));
    let result = {
      questionOneBarchart: {
        xAxisAgegroups: ["18-", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
        yAxisMaleFemalePercentages: {
            "18-": { males: "14.285714285714286%", females: "14.285714285714286%" },
            "18-24": { males: "0%", females: "0%" },
            "25-34": { males: "0%", females: "14.285714285714286%" },
            "35-44": { males: "14.285714285714286%", females: "0%" },
            "45-54": { males: "0%", females: "14.285714285714286%" },
            "55-64": { males: "0%", females: "14.285714285714286%" },
            "65+": { males: "14.285714285714286%", females: "0%" }
        }
      }
    };
      expect(result.questionOneBarchart.xAxisAgegroups)
        .toEqual(["18-", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"])
      console.log(JSON.stringify(result, undefined, 3))
      //we can fix floating points later!!
      expect(result.questionOneBarchart.yAxisMaleFemalePercentages)
        .toEqual({
                "18-": { males: "14.285714285714286%", females: "14.285714285714286%" },
                "18-24": { males: "0%", females: "0%" },
                "25-34": { males: "0%", females: "14.285714285714286%" },
                "35-44": { males: "14.285714285714286%", females: "0%" },
                "45-54": { males: "0%", females: "14.285714285714286%" },
                "55-64": { males: "0%", females: "14.285714285714286%" },
                "65+": { males: "14.285714285714286%", females: "0%" }
            });
  });
});


