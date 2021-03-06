const functions = require('firebase-functions');
const express=require('express');
const firebase=require('firebase-admin');
const app=express();
var router = express.Router();
var db = firebase.database();
const cors = require('cors')({origin: true});
// var docx = require('docx');










// Related TO Asset App this is here for the Time being
router.post('/saveAsset',(req,res)=> {
   	var newAssetObject = {
   		assetId:Date.now(),
   		assetName:req.body.assetName,
   		assetStatus:1,
   		type:req.body.type,
   		description:req.body.description,
   		orgName:req.body.orgName,
   		location:req.body.location,
   		deptName:req.body.deptName,
   		roomNo:req.body.roomNo
   	};

   	var assetRef = db.ref("assets");
   	assetRef.push(newAssetObject,err=>{
   		if (err) {
   			res.send({status:0});
   		}
   		else{
   			newAssetObject.status = 1;
   			res.send(newAssetObject);
   		}
   	});



   	       // mJsonObject.put("assetName",name);
           //  mJsonObject.put("orgName",orgname);
           //  mJsonObject.put("location",location);
           //  mJsonObject.put("deptName",deptName);
           //  mJsonObject.put("roomName",roomNo);
});

router.get('/getAssetDetails',(req,res)=> {
		

		// get Asset Id   	
		var assetId = req.query.id;
		var asssetRef = db.ref("assets");	
		var returnJson = {};
		asssetRef.once("value",snap => {
					if (snap.val()) {

						// snap exists
						snap.forEach(s=>{
							if (s.val().assetId == assetId) {
								 // 	

								returnJson.assetName = s.val().assetName;
								returnJson.assetId = s.val().assetId;
								returnJson.assetStatus = s.val().assetStatus;
								returnJson.deptName = s.val().deptName;
								returnJson.location = s.val().location;
								returnJson.roomNo = s.val().roomNo;
								returnJson.orgName = s.val().orgName;
								returnJson.type = s.val().type;
								returnJson.description = s.val().description;
								returnJson.status = 1;
								res.send(returnJson);
							}
						});
					}
					else{
							res.send({status:0});
					}




					// if (snap.val()) {	
					// 	console.log("hit");
					// 	res.send(snap.val());
					// }	
					// else{
					// 	console.log("Fail");
					// 	res.send({status:0});
		});
});










router.get('/home',(req,res)=> {
    res.render('home');
});



router.get('/dash',(req,res)=> {
    res.render('dashboard');
});



router.get('/location',(req,res)=> {
	res.render('location');
});


router.get('/department',(req,res)=> {
	res.render('department');
});

router.get('/domain',(req,res)=> {
	res.render('domain');
});


router.get('/questions',(req,res)=> {
	res.render('questions');
});
// @deepak please use variables names properly ,



router.get('/audit',(req,res)=> {
	res.render('audit');
});


// Working




router.post('/createOrganisation', (req, res) => {

	console.log("Called Crate organisation");


	var newOrg = {
		orgName:req.body.orgName,
		orgId:Date.now()
	};


	var orgRef = db.ref("organisation");
	orgRef.push(newOrg,err => { 
		console.log("Something happend");
		if (err) {
			res.send({status:0});
		}
		else{
			newOrg.status = 1;
			res.send(newOrg)
		}
	});
});



/*Query the Answers*/
router.post('/LocationReport',(req, res) => {

	var locationId = req.body.locationId;
	var auditId = req.body.auditId;

});

// router.post('/orgReport',(req, res) => {
		


// });

router.post('/deptReport',(req, res) => {


var locationId = req.body.locationId;
	var auditId = req.body.auditId;
});

router.post('/domainReport',(req, res) => {

});

router.post('/auditReport',(req, res) => {

});


/*Create New Location for a organisation.
	input
	 		{		jabberwock12
	 				"orgId":4,
					"locationName": "Bang-1"
				
					
	 		} 

	 output
	 			{
					"orgId": 4,
					"locationName": "Bang-1"
					"locationId":17
	 			}
		


  */


  // Working
router.post('/createLocation',(req, res) => {
    	
    	var newLocation = {
    		orgId:req.body.orgId,
    		locationName:req.body.locationName,
    		locationId:Date.now()
    	};
    	var locationRef = db.ref("locations");
    	locationRef.push(newLocation,err=>{
    		if (err) {
    			res.send({status:0});
    		}
    		else{
    			newLocation.status = 1;
    			res.send(newLocation)
    		}
    	});
});



/*Create New Department for a organisation at a location
	input
	 		{		
	 				"orgId":4,
					"locationId":17,
					"departmentName":"HR"
	 		} 

	 output
	 			{
					"orgId":4,
					"locationId":17,
					"departmentName":"HR",
					"deptId":4
	 			}
		


  */

  // Working
router.post('/createDepartment',(req, res) => {
    	var newDept = {
    		locationId:req.body.locationId,
    		orgId:req.body.orgId,
    		departmentName:req.body.departmentName,
    		deptId:Date.now()
    	};

    	var departmentRef = db.ref("department");
    	departmentRef.push(newDept,err => {
    		if (err) {
    			res.send({status:0});
    		}
    		else{
    			newDept.status = 1;
    			res.send(newDept);
    		}
    	});
});



/*Create New Domain for a department at a location 
	input
	 		{		
	 				"orgId":4,
					"locationId":17,
					"deptId":4
					"domainName": "Gender"
				
					
	 		} 

	 output
	 			{
					"orgId":4,
					"locationId":17,
					"deptId":4,
					""
	 			}
		


  */



router.post('/createDomain',(req, res) => {
	var newDomain = {
		orgId:req.body.orgId,
		locationId:req.body.locationId,
		deptId:req.body.deptId,
		domainId:Date.now(),
		domainName:req.body.domainName,
	};
	var domainRef = db.ref("domains");
	domainRef.push(newDomain,err=>{
		if (err) {
			res.send({status:0});

		}
		else{
			newDomain.status = 1;
			res.send(newDomain);
		}
	});

    
});

router.post('/createQuestion',(req, res) => {

	var newQuestion = {
		questionText : req.body.questionText,
		orgId:req.body.orgId,
		locationId: req.body.locationId,
		deptId:req.body.deptId,
		domainId:req.body.domainId,
		questionId:Date.now()
	};  
	var questionRef = db.ref("questions");
	questionRef.push(newQuestion,err => {

    		if (err) {
    			res.set('Access-Control-Allow-Origin', "*");
  				res.set('Access-Control-Allow-Methods', 'GET, POST');
				res.status(200).send({status:0});
    		}
    		else{
    			res.set('Access-Control-Allow-Origin', "*");
  				res.set('Access-Control-Allow-Methods', 'GET, POST');
  				newQuestion.status = 1;
				res.status(200).send(newQuestion);
    		}

    });
    
});

router.get('/getOrganisations',(req, res) => {


	var returnJson = {
		"orgs":[]
	}
	var orgRef = db.ref("organisation");
	orgRef.once("value",snap => {
			snap.forEach(s=>{
				returnJson.orgs.push({
					id:s.val().orgId,
					name:s.val().orgName

				});
			});
			res.send(returnJson);
	});
    
});






router.post('/getLocations',(req, res) => {

	// The Org to get Locations
	var  orgId = req.body.orgId;
	console.log("Organisation To Query "+orgId);

	var locRef = db.ref("locations");
	var returnJson = {
		"locations":[]
	};



	locRef.orderByChild("orgId").equalTo(orgId).once("value",snap => {
		console.log("Inside Callback");
		if (snap.val()) {
			// Locations Exist
			snap.forEach(single=>{
				returnJson.locations.push({
					locationId:single.val().locationId,
					locationName:single.val().locationName
				});
			});
			returnJson.status = 1;
			res.send(returnJson);
		}
		else{
			res.send({status:0});
		}
	});

    
});

router.post('/getDepartments',(req, res) => {

    	var locationId = req.body.locationId;
    	var departmentRef = db.ref("department");
    	var returnJson = {
    		"department":[]
    	};

    	departmentRef.orderByChild("locationId").equalTo(locationId).once("value",snap => {
    		if (snap.val()) {
    			snap.forEach(s => {
    				returnJson.department.push({
    					deptId:s.val().deptId,
    					departmentName:s.val().departmentName
    				});
    			});
    			returnJson.status = 1;
 		   		res.send(returnJson);

    			
    		}
    		else{
    			res.send({status:0});
    		}
    	});
});


// Since this page is visible only after selecting Department , need to query
// the database with only deptId
router.post('/getDomains',(req, res) => {

	var deptId = req.body.deptId;

	// we have Domain Id 

   var returnJson = {
   	"domains":[]
   };
	var domainsRef = db.ref("domains");

	// Query with departmentId
	domainsRef.orderByChild("deptId").equalTo(deptId).once("value",snap => {

		if (snap.val()) {
			snap.forEach(s=> {
			
				// Value Exists matching deptId
				returnJson.domains.push({
						domainName:s.val().domainName,
						domainId:s.val().domainId,
						locationId:s.val().locationId,
						orgId:s.val().orgId,
						deptId:s.val().deptId
				});
			});

			//Append operation Result
			returnJson.status = 1;
			res.send(returnJson);
				//this is a alternative way of Filtering 
				// if (s.val().locationId == locationId && s.val().orgId == orgId && s.val().deptId == deptId ){
				// console.log("Match found");
					
		}
		else{
				// no match
		 		// Do nothingc
		 		res.send({status:0});
			}
		});
		
		
});

router.post('/getQuestions',(req, res) => {

	// var locationId = req.body.locationId;
	// var orgId  = req.body.orgId;
	// var deptId = req.body.deptId;
	var domainId  = req.body.domainId;
	var questionsRef = db.ref("questions");
	var returnJson = {
		"questions":[]
	}
	questionsRef.orderByChild("domainId").equalTo(domainId).once("value",snap => {
		if (snap.val()) {
			snap.forEach(s => {
						returnJson.questions.push({
							questionId:s.val().questionId,
							questionText:s.val().questionText
						});
			});
			returnJson.status = 1;
			res.send(returnJson);
		}
		else{
			res.send({status:0});
		}
	});

    
});


router.post('/checkAdmin',(req, res) => {
		var email = req.body.email;
		var pass = req.body.pass;
		var returnJson = {};
		if (email == "jaya@gmail.com" && pass == "123456789") {
				returnJson.status = 1;
				res.send(returnJson);
		}
		else{
			res.send(returnJson);
		}
});

router.post('/editOrgansation',(req, res) => {

	var orgId = req.body.orgId;
	var newName = req.body.newName;
	var orgRef  = db.ref("organization");
	orgRef.orderByChild("id").equalTo(orgId).once("value",snap => {
		  
		  console.log("Organisation Name to Edit "+snap.val().id);

			
    
	});
});


router.post('/editLocation',(req, res) => {

	var locationId  = req.body.locationId;
	var orgId =  req.body.orgId;
	var orgRef = db.ref()
	
    
});








router.post('/createAudit',(req, res) => {
	var auditName = req.body.auditName;
	var auditDate = req.body.auditDate;
	var domainId = req.body.domainId;
	var orgId = req.body.orgId;
	var deptId = req.body.deptId;
	var locationId = req.body.locationId;
	var auditRef = db.ref("audits");
	var newAuditObj = {
		auditId:Date.now(),
		auditName:auditName,
		domainId:domainId,
		orgId:orgId,
		deptId:deptId,
		locationId:locationId
	};
	auditsRef.push(newAuditObj,err=>{
		if (err) {
			res.send({status:0});
		}
		else{
			newAuditObj.status = 1;
			res.send(newAuditObj);

		}
	});	
});

router.post('/getAudits',(req, res) => {

	var domainId  = req.body.domainId;
	var auditRef = db.ref("audits");
	auditRef.orderByChild("domainId").equalTo(domainId).once("value",snap=>{
		if (snap.val()) {
			var returnJson = {
				"audits":[]

			};
			snap.forEach(s=>{
				returnJson.audits.push({
					auditId:s.val().auditId,
					auditName:s.val().auditName,
					auditDate:s.val().auditDate
				});
			});
				
			res.status = 1;
			res.send(returnJson);

		}
		else{
			res.send({status:0});
		}
	});
	
    
});





router.post('/editDepartment',(req, res) => {
    
});

router.get('/editDomain',(req, res) => {
    
});

router.get('/editQuestion',(req, res) => {
    
});


router.post('/genByLocation',(req, res) => {

	// The location to Query the Database
	var locationId = req.body.locationId;
    
});
router.post('/genByDept',(req, res) => {
	var deptId = req.body.deptId;
    
});
router.post('/genByDomain',(req, res) => {
    	var domainId = req.body.domainId;
});





router.post('/createAudit',(req,res) => {
		var auditDate = req.body.date;
		var auditName = req.body.auditName;
		var orgId = req.body.orgId;
		var locationId = req.body.locationId;
		var deptId = req.body.deptId;
		var domainId = req.body.domainId;

		var auditsRef = db.ref("audits");
		var newAudit = {
		   auditDate:auditDate,
		   auditId:Date.now(),
		   orgId:orgId,
		   auditName:auditName,
		   locationId:locationId,
		   deptId:deptId,
		   domainId:domainId
		};
		auditsRef.push(newAudit,err=>{
			if (err) {
				res.send({status:0});
			}
			else{
				newAudit.status = 1;
				res.send(newAudit);
			}
		})
});




router.post('/getAudits',(req,res)=>{
   
  	    var orgId = req.body.orgId;
		var locationId = req.body.locationId;
		var deptId = req.body.deptId;
		var domainId = req.body.domainId;
		var auditRef = db.ref("audits");
		var returnJson = {
			"audits":[]
		};
		auditRef.orderByChild("domainId").equalTo(domainId).once("value",snap => {
			if (snap.val()) {
				snap.forEach(s=>{
						returnJson.audits.push({
							auditId:s.val().auditId,
							auditName:s.val().auditName
					});
				});
				returnJson.status = 1;
				res.send(returnJson);
					
			}
			else{
				res.send({status:0});
			}
		});

});



router.post('/getReportFor',(req,res)=>{
  //must send the id and name of field with which u  want to get the data. 
  	    var id = req.body.adui;
		var name=req.body.name;
	});

router.get('/getAuditsforSave',(req,res)=>{
  //must send the id and name of field with which u  want to get the data. 
  	    var id = 2334;
		var name="auditId";

		var auditRef = db.ref("audits");
		var returnJson = {
			"audits":[]
		};
		auditRef.orderByChild(name).equalTo(id).once("value",snap => {
			if (snap.val()) {
				snap.forEach(s=>{
						returnJson.audits.push({
							questionText:s.val().questionText,
							option:s.val().option,
							extraText:s.val().extraText,
							fileUrl:s.val().fileUrl
					});
				});
				const doc = new docx.Document();
				const numbering = new docx.Numbering();
				const numberedAbstract = numbering.createAbstractNumbering();
				numberedAbstract.createLevel(0, "lowerLetter", "%1)", "left");
				
				//const doc = new docx.Document();
				//const doc1 = new docx.Document();
				
				 const letterNumbering = numbering.createConcreteNumbering(numberedAbstract);
				// data.forEach((opt) =>
				//     doc.createParagraph(opt.question,opt.option).setNumbering(letterNumbering, 0)
				// );
				for(i=0;i<data.length;i++){
				  doc.createParagraph((i+1)+") "+data[i].questionText)
				  doc.createParagraph(data[i].option);
				  doc.createParagraph(data[i].extraText);
				  doc.createParagraph(data[i].fileUrl);
				 }
			  
			   
			  // Used to export the file into a .docx file 
			  //var exporter = new docx.LocalPacker(doc);
			   
			  // Or use the express packer to make the file downloadable. 
			  // res is express' Response object 
			  var exporter = new docx.ExpressPacker(doc, res);
			   
			  exporter.pack('My First Document');
					
			}
			else{
				res.send({status:0});
			}
		});

});




/*The API which savesQuestions*/

router.post('/saveAnswer',(req, res) => {

	//Get all the Variabels regarding to Question

	var questionRef  = db.ref("questions");
	var auditId = req.body.auditId;
    
    // The Question Which was saved, save button has been pressed
	var questionId = req.body.questionId;
	var auditsRef = db.ref("audits");
	var newAuditForQuestion = {
		orgId:req.body.orgId,
		auditId:auditId,
		questionId:questionId,
		locationId: req.body.locationId,
		deptId:req.body.deptId,
		domainId:req.body.domainId,
		questionText:req.body.questionText,
	 	option:req.body.option,                 // yes or No Radio bUtto n
		extraText:req.body.extraText,              // TextBox 
		fileUrl :req.body.fileUrl,                //Attachement URL
		critical:req.body.critical      // Critical or not critical  btton
	};

	auditsRef.push(newAuditForQuestion,err=>{
		if (err) {

			res.send({status:0});
		}
		else {
			newAuditForQuestion.status = 1;
			res.send(newAuditForQuestion);
		}
	});
});





	// 	//Construct the Object to push to Questions Collections
	// var questionObj = {
	// 	orgId:req.body.orgId,
	// 	questionId:Date.now(),
	// 	locationId: req.body.locationId,
	// 	deptId:req.body.deptId,
	// 	domainId:req.body.domainId,
	// 	questionText:req.body.questionText,
	// 	option:req.body.option,
	// 	extraText:req.body.extraText,
	// 	fileUrl :req.body.fileUrl,
	// 	critical:req.body.critical
	// };
    
 //    var newQuestionRef = questionsRef.push(questionObj,err => {

 //    		if (err) {
 //    			res.set('Access-Control-Allow-Origin', "*")
 //  				res.set('Access-Control-Allow-Methods', 'GET, POST')
	// 			res.status(200).send({status:0});
 //    		}
 //    		else{
 //    			res.set('Access-Control-Allow-Origin', "*")
 //  				res.set('Access-Control-Allow-Methods', 'GET, POST')
 //  				questionObj.status = 1;
	// 			res.status(200).send(questionObj);
 //    		}

 //    });











router.post('/generateByDomain',(req, res) => {

	var domainId = req.body.domainId;
	var auditId = req.body.auditId;
	var auditsRef = db.ref("audits");
	var criticalCount = 0 ;
	var notCriticalCount = 0;
	var yesCount = 0;
	var noCount = 0;
	var partialCount =0;
	var returnJson = {

	};
	auditsRef.orderByChild("auditId").equalTo(auditId).once("value",snap =>{
		console.log("Inside Audit Filtered Callback");

		// we have to return how mayn yes or no 
		// how many critical or not critical
		if (snap.val()) {

				snap.forEach(s => {
				
					// we have list of Audits of september
						if (s.val().critical==1) {
							criticalCount ++;

						}
						else{
							notCriticalCount++;
						}
						
						switch(s.val().option){
							case 0:
								yesCount++;
								break;
							case 1:
								noCount++;
								break;
							case 2:
								partialCount++;
								break;
							default:
								break;
						};
				});
				returnJson.criticalCount = criticalCount;
				returnJson.yesCount =  yesCount;
				returnJson.noCount = noCount;
				returnJson.partialCount = partialCount;
				returnJson.status = 1;
				res.send(returnJson);
		}
		else{
			res.send({status:0});
		}

	});
});





router.get('/getDocument',(req,res)=>{



		var docx = require('docx');

		var doc = new docx.Document();
		var paragraph = new docx.Paragraph("Short hand notation for adding text.");
		doc.addParagraph(paragraph);
		var exporter = new docx.ExpressPacker(doc, res);
		exporter.pack('My Document');

});
/*

	var JSZip = require('jszip');
	var Docxtemplater = require('docxtemplater');

	var fs = require('fs');
	var path = require('path');

	//Load the docx file as a binary
	var content = fs
	    .readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');

	var zip = new JSZip(content);

	var doc = new Docxtemplater();
	doc.loadZip(zip);

	//set the templateVariables
	doc.setData({
	    first_name: 'John',
	    last_name: 'Doe',
	    phone: '0652455478',
	    description: 'New Website'
	});

	try {
	    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
	    doc.render()
	}
	catch (error) {
	    var e = {
	        message: error.message,
	        name: error.name,
	        stack: error.stack,
	        properties: error.properties,
	    }
	    console.log(JSON.stringify({error: e}));
	    // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
	    throw error;
	}

	var buf = doc.getZip()
	             .generate({type: 'nodebuffer'});

	// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
	fs.writeFileSync(path.resolve(__dirname, 'output.docx'), res);


*/























	// COpied from DOCx Module

// var doc = new docx.Document();

// var paragraph = new docx.Paragraph("Hello World");
// var institutionText = new docx.TextRun("University College London").bold();
// var dateText = new docx.TextRun("5th Dec 2015").tab().bold();
// paragraph.addRun(institutionText);
// paragraph.addRun(dateText);

// doc.addParagraph(paragraph);

// // Feature coming soon
// // var media = new docx.Media();
// // media.addMedia("happy-penguins", "./demo/penguins.jpg");
// // var pictureRun = new docx.PictureRun(media.getMedia("happy-penguins"));

// // var exporter = new docx.LocalPacker(doc);
// 	var exporter = new docx.ExpressPacker(doc, res);

// 	// var exporter = new docx.ExpressPacker(doc, res);

// exporter.pack('My Document');
	// //const numberedAbstract = numbering.createAbstractNumbering();
	//  var data=[{
	//  	 "question":"Is the HR Following Best Diversity Practices?",
	//   	 "option":"Deepak",
	//   	 "critical":"No",
	//   	 "optionText":"No, Because the 70% people are male and above 35 years of Age",
	//   	 "fileUrl":"https://firebasestorage.googleapis.com/v0/b/audit-app-819d8.appspot.com/o/Audit%20app_specs-14-August-2017%20.pdf?alt=media&token=391167a5-9be0-4c80-bdfd-c221cce7a53e"
	// 	},
	//   	{
	// 		"question":"Does the Tech Team , run Security Protocal monthly",
	// 		"option":"Partia",
	// 		"critical":"No",
	// 		"optionText":"The Team follows once in two month",
	// 		"fileUrl":"https://firebasestorage.googleapis.com/v0/b/audit-app-819d8.appspot.com/o/Audit%20app_specs-14-August-2017%20.pdf?alt=media&token=391167a5-9be0-4c80-bdfd-c221cce7a53e"
	//   	}
	  
	//   ];
	  
	//   var doc = new docx.Document();
	//   // const numbering = new docx.Numbering();
	//   // const numberedAbstract = numbering.createAbstractNumbering();
	//   // numberedAbstract.createLevel(0, "lowerLetter", "%1)", "left");
	  
	//   // //const doc = new docx.Document();
	//   // //const doc1 = new docx.Document();
	  
	//   //  const letterNumbering = numbering.createConcreteNumbering(numberedAbstract);
	//   // // data.forEach((opt) =>
	//   // //     doc.createParagraph(opt.question,opt.option).setNumbering(letterNumbering, 0)
	//   var paragraph = new docx.Paragraph("Some cool text here.");

	//   // );
	//   for(i=0;i<data.length;i++){
	// 	doc.createParagraph((i+1)+") "+data[i].question)
	// 	doc.createParagraph(data[i].option);
	// 	doc.createParagraph("Critcal: ");
	// 	doc.createParagraph(data[i].critical);
		
	// 	doc.createParagraph("Optional Description: ");
	// 	doc.createParagraph(data[i].optionText);
	// 	doc.createParagraph("Attachement URL: ");
	// 	doc.createParagraph(data[i].fileUrl);
	//    }
	
	//  
	// // Used to export the file into a .docx file 
	// //var exporter = new docx.LocalPacker(doc);
	//  
	// // Or use the express packer to make the file downloadable. 
	// // res is express' Response object 
	// var exporter = new docx.ExpressPacker(doc, res);
	//  
	// exporter.pack('Apple-Bang_Tech_Report');
// });




module.exports = router;