const { db } = require('./../models/dbInit')
let contact_infos = Object.create(null)
let retreivedData = [];

module.exports = async function getJurisdictionContactInfos(req, res, next) {
  const rawData = await getJurisdictionInfo(req.params)
  await res.json({ contact_infos: rawData })
}

const getJurisdictionInfo = async (httpParams) => {
  let jurisdiction_id = httpParams.jurisdiction_id
  await findJurisdictionInDB(jurisdiction_id)
  return contact_infos
}

const findJurisdictionInDB = async (jurisdiction_id) => {
  const SQLQuery = `
  SELECT jurisdictions.jurisdiction_id, jurisdictions.telephone, jurisdictions.fax, jurisdictions.email,jurisdictions_verified_contact_infos.type, jurisdictions_verified_contact_infos.data
  FROM jurisdictions
  LEFT JOIN jurisdictions_verified_contact_infos
  ON jurisdictions.jurisdiction_id = jurisdictions_verified_contact_infos.jurisdiction_id
  WHERE jurisdictions.jurisdiction_id = ?
  `
  await db.all(SQLQuery,jurisdiction_id,(err,row) => {
    if (err) { throw err }
    serializeJurisdiction(row)
    console.log(row)
    
  })
}

const serializeJurisdiction = (allJurisdictions) => {
  const serializedJurisdiction = {}
  serializedJurisdiction.telephone = [];
  serializedJurisdiction.email = [];
  serializedJurisdiction.fax = [];
  for (let i = 0; i < allJurisdictions.length; i++){
    if (i == 0){
      if (allJurisdictions[i].telephone !== null) {
        serializedJurisdiction.telephone.push({data: allJurisdictions[i].telephone, verified: false})
        const jurisdictionVerifiedData = processVerifiedData(allJurisdictions[i])
        serializedJurisdiction[jurisdictionVerifiedData.type].push({data: jurisdictionVerifiedData.data, verified: jurisdictionVerifiedData.verified})
      }
    } else {
      const jurisdictionVerifiedData = processVerifiedData(allJurisdictions[i])
        serializedJurisdiction[jurisdictionVerifiedData.type].push({data: jurisdictionVerifiedData.data, verified: jurisdictionVerifiedData.verified})
    }
  }  
  setValueInObject(serializedJurisdiction)
}

const processVerifiedData = (verifiedData) => {
  const dataType = Object.values(verifiedData)[4]
  const dataValue = Object.values(verifiedData)[5]
  const verifiedContactDetails = {type: dataType, data: dataValue, verified: true}
  return verifiedContactDetails
}

const setValueInObject = (value) => {
  contact_infos = value
}

