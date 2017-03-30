//lista 

  //var  activityList=new  Ecore.EList<Activity>;
  var activityList=new Array();
  var gatewayList=new Array();
  var eventList=new Array();
  var dataObjectList=new Array();
  var messageList=new Array();
  var linkList=new Array();
  var poolList=new Array();
 
  //METAMODEL
  
  
  
  	var resourceSet = Ecore.ResourceSet.create();
	var resource = resourceSet.create({ uri: '/model.json' });
	
	var Link = Ecore.EClass.create({
	    name: 'Link',
	    eStructuralFeatures: [
	        Ecore.EAttribute.create({ name: 'name', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'type', eType: Ecore.EString }), 
	        Ecore.EAttribute.create({ name: 'id', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'idSource', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'idTarget', eType: Ecore.EString }),
	        
	    ]
	});
		
	var Activity = Ecore.EClass.create({
	    name: 'Activity',
	    eStructuralFeatures: [
	        Ecore.EAttribute.create({ name: 'name', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'type', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'id', eType: Ecore.EString })
	    ]
	});
	var Pool = Ecore.EClass.create({
	    name: 'Pool',
	    eStructuralFeatures: [
	        Ecore.EAttribute.create({ name: 'name', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'type', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'id', eType: Ecore.EString })
	    ]
	});
	var Activity_links = Ecore.EReference.create({
		   name: 'links',
		   upperBound: -1,
		   eType: Link
		});
	Activity.get('eStructuralFeatures').add(Activity_links);
	
	
	var Gateway = Ecore.EClass.create({
	    name: 'Gateway',
	    eStructuralFeatures: [
	        Ecore.EAttribute.create({ name: 'name', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'type', eType: Ecore.EString }), 
	        Ecore.EAttribute.create({ name: 'id', eType: Ecore.EString })
	    ]
	});
	
	var Gateway_links = Ecore.EReference.create({
		   name: 'links',
		   upperBound: -1,
		   eType: Link
		});
	Gateway.get('eStructuralFeatures').add(Gateway_links);
	
	var Event = Ecore.EClass.create({
	    name: 'Event',
	    eStructuralFeatures: [
	        Ecore.EAttribute.create({ name: 'name', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'type', eType: Ecore.EString }), 
	        Ecore.EAttribute.create({ name: 'id', eType: Ecore.EString })
	    ]
	});
	var Event_links = Ecore.EReference.create({
		   name: 'links',
		   upperBound: -1,
		   eType: Link
		});
	Event.get('eStructuralFeatures').add(Event_links);
	
	var DataObject = Ecore.EClass.create({
	    name: 'DataObject',
	    eStructuralFeatures: [
	        Ecore.EAttribute.create({ name: 'name', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'type', eType: Ecore.EString }), 
	        Ecore.EAttribute.create({ name: 'id', eType: Ecore.EString })
	    ]
	});
	var DataObject_links = Ecore.EReference.create({
		   name: 'links',
		   upperBound: -1,
		   eType: Link
		});
	DataObject.get('eStructuralFeatures').add(DataObject_links);
	
	var Message = Ecore.EClass.create({
	    name: 'Message',
	    eStructuralFeatures: [
	        Ecore.EAttribute.create({ name: 'name', eType: Ecore.EString }),
	        Ecore.EAttribute.create({ name: 'type', eType: Ecore.EString }), 
	        Ecore.EAttribute.create({ name: 'id', eType: Ecore.EString })
	    ]
	});
	var Message_links = Ecore.EReference.create({
		   name: 'links',
		   upperBound: -1,
		   eType: Link
		});
	Message.get('eStructuralFeatures').add(Message_links);
		
		
	var DiagramPackage = Ecore.EPackage.create({
	    name: 'diagramPackage',
	    nsURI: 'http://www.example.org/sample',
	    nsPrefix: 'diagramPackage',
	    eClassifiers: [
			Activity,
			Gateway,
			Event,
			DataObject,
			Message,
			Link
	    ]
	});
	resource.add(DiagramPackage);
	
	
	