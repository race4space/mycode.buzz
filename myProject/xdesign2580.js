

/*START COMPONENT//*/
/*id: 100//*/
/*type: RuntimeCode//*/
//START RunTime/Shared.js
class Shared{
  constructor(){
  }
fn_removeSpace(str){        
  str = str.replace(/\s+/g, '');
  return str;
}

fn_isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
fn_hasMembersObject(obj) {
  return Object.keys(obj).length !== 0;
}

fn_capitalizeTheFirstLetterOfEachWord(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

fn_inStr(str_haystack, str_needle){

  let int_pos=str_haystack.indexOf(str_needle);
  if(int_pos===-1){return false;}
  return true;
}

 fn_enumerateObject(obj_myObj, str_message=""){

    console.groupCollapsed("ENUMERATE OBJECT " + str_message);

    for (let [key, foo_value] of Object.entries(obj_myObj)) {
        console.log(`${key}: ${foo_value}`);
        if (typeof foo_value === "object" && foo_value !== null && (key=="obj_design"))  {
            this.fn_enumerateObject(foo_value, "");
        }
        else{
            //console.log(`${key}: ${foo_value}`);
        }
    }
    console.groupEnd();
  }
  fn_iteratePropertyNames(obj){
    do Object.getOwnPropertyNames(obj).forEach(function(name) {
        console.log(name);
    });
    while(obj = Object.getPrototypeOf(obj));
  }

  fn_findInObject(obj_myObj, str_search){
    for (let [key, foo_value] of Object.entries(obj_myObj)) {
        console.log(`${key}: ${foo_value}`);
    }
  }

  fn_getUniqueId(str_id){
    let generator = new IDGenerator();
    return str_id +"_" + generator.generate();
  }
   fn_getRandom(number) {
    return Math.floor(Math.random() * (number+1));
  }

  fn_getRandomColor() {
    return 'rgb(' + this.fn_getRandom(255) + ',' + this.fn_getRandom(255) + ',' + this.fn_getRandom(255) + ')';
  }


  fn_flipBool(bln_val){
    if(bln_val){return false;}
    else{return true;}
  }
  fn_parseBool(foo_val){
    switch(foo_val.toLowerCase()){
      case "false":
        foo_val=false;
        break;
      case "0":
        foo_val=false;
        break;
      case "no":
          foo_val=false;
        break;
      case "true":
        foo_val=true;
        break;
      case "1":
        foo_val=true;
        break;
      case "yes":
        foo_val=true;
        break;
      default:
    }
    return foo_val;
  }

  getAllFuncs(toCheck) {
    var props = [];
    var obj = toCheck;
    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter(function(e, i, arr) {
       if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true;
    });
  }

  fn_removeArrOfArrays(arr_first, arrOfArrays) {
    let str_value1, str_value2;
    let i, j;
    for (i=0; i<arr_first.length; i++) {
        str_value1=arr_first[i];

        for (j=0; j<arrOfArrays.length; j++) {
          str_value2=arrOfArrays[j][0];
          if(str_value1===str_value2){
            arrOfArrays.splice(j, 1);
          }
        }

    }
    return arrOfArrays;
}
}//END CLS



function IDGenerator() {

  this.length = 8;
  this.timestamp = +new Date;

  var _getRandomInt = function( min, max ) {
   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }

  this.generate = function() {
    var ts = this.timestamp.toString();
    var parts = ts.split( "" ).reverse();
    var id = "";

    for( var i = 0; i < this.length; ++i ) {
     var index = _getRandomInt( 0, parts.length - 1 );
     id += parts[index];
    }

    return id;
  }
}
//END SHARED

function fn_onScroll(){  
}

// Parameters:
// code 								- (string) code you wish to format
// stripWhiteSpaces			- (boolean) do you wish to remove multiple whitespaces coming after each other?
// stripEmptyLines 			- (boolean) do you wish to remove empty lines?
var fn_formatCode = function(code, stripWhiteSpaces=true, stripEmptyLines=true) {
  //"use strict";
  var whitespace          = ' '.repeat(4);             // Default indenting 4 whitespaces
  var currentIndent       = 0;
  var char                = null;
  var nextChar            = null;


  var result = '';
  for(var pos=0; pos <= code.length; pos++) {
      char            = code.substr(pos, 1);
      nextChar        = code.substr(pos+1, 1);

      // If opening tag, add newline character and indention
      if(char === '<' && nextChar !== '/') {
          result += '\n' + whitespace.repeat(currentIndent);
          currentIndent++;
      }
      // if Closing tag, add newline and indention
      else if(char === '<' && nextChar === '/') {
          // If there're more closing tags than opening
          if(--currentIndent < 0) currentIndent = 0;
          result += '\n' + whitespace.repeat(currentIndent);
      }

      // remove multiple whitespaces
      else if(stripWhiteSpaces === true && char === ' ' && nextChar === ' ') char = '';
      // remove empty lines
      else if(stripEmptyLines === true && char === '\n' ) {
          //debugger;
          if(code.substr(pos, code.substr(pos).indexOf("<")).trim() === '' ) char = '';
      }

      result += char;
  }

  return result;
}

//END RunTime/Shared.js
//START RunTime/LevelObject.js
class LevelObject {
    constructor() {      
    }  
    fn_isObject(foo_val){
      if(typeof foo_val === 'object' && foo_val !== null){
        return true;
      }
      return false;
    }                  
    fn_flipBool(bln_bool){
      if(bln_bool){return false;}
      return true;
    }
    fn_debug(obj_debug=false, str_message=""){

      if(!obj_debug){
        obj_debug=this;
      }
      console.groupCollapsed("DEBUG OBJECT " + str_message);    
      console.log("obj_design.str_type: " + obj_debug.obj_design.str_type);
      console.log("str_name: " + obj_debug.obj_design.str_name);
      console.log("obj_design.str_tag: " + obj_debug.obj_design.str_tag);
      console.log("str_id: " + obj_debug.obj_design.str_id);
      console.groupEnd();
      //this.fn_enumerateObject(obj_debug, "LEVEL OBJECT DEBUG")
    }
   fn_enumerateObject(obj_myObj, str_message=""){            
    
      console.groupCollapsed("ENUMERATE OBJECT " + str_message);    
  
      for (let [key, foo_value] of Object.entries(obj_myObj)) {        
          console.log(`${key}: ${foo_value}`);        
          if (typeof foo_value === "object" && foo_value !== null) {            
              //fn_enumerateObject(foo_value, "");
          }
          else{
              //console.log(`${key}: ${foo_value}`);        
          }
      }    
      console.groupEnd();
  }  
  fn_cloneObject(source){      
    return Object.assign({}, source);  
  }
}
//END CLASS LevelObject
//END RunTime/LevelObject.js
//START RunTime/Holder.js

class Holder extends LevelObject{  
    constructor() {      
      super();            
      this.int_modeReadOnly=1;       
      this.int_modeEdit=2;       
      this.int_modeRuntime=10;       

      this.obj_design={};   
      this.obj_domStyle={};   
      this.obj_domProperty={};         
      this.obj_domAttribute={};         
      this.obj_theme={};   

      this.obj_design.int_modeExecute=this.int_modeEdit;     
    } 
    
}

//END RunTime/Holder.js
//START RunTime/BaseObject.js
class BaseObject extends LevelObject{
    constructor(obj_ini) {
        super(obj_ini); 
        
        this.fn_initialize(obj_ini);
    }    
    fn_initialize(obj_ini){                           
        
        this.obj_ini=obj_ini;//required   
        if(this.obj_holder==undefined){//ensure continuity of obj_holder variables e.g obj_holder.obj_container
            this.obj_holder=new Holder;//required
        }     
        
        //START INITIALIZE DESIGN
        this.obj_design=obj_ini.obj_design;        
        
        this.fn_setContainer(false);
        
        if(this.obj_design.str_id==undefined){this.obj_design.str_id=obj_shared.fn_getUniqueId("myId");}
        if(this.obj_design.str_name==undefined){this.obj_design.str_name=undefined;}//ensure visible placeholder at front of object defintion
        if(this.obj_design.str_type==undefined){this.obj_design.str_type=undefined;}//ensure visible placeholder at front of object defintion
        if(this.obj_design.str_tag==undefined){this.obj_design.str_tag=undefined;}//ensure visible placeholder at front of object defintion

        if(this.obj_design.str_content===undefined){this.obj_design.str_content="";}           
        
        this.obj_design.int_modeExecute=obj_ini.obj_design.int_modeExecute;         
        if(this.obj_design.int_modeExecute===undefined){this.obj_design.int_modeExecute=undefined;}  
        
        this.obj_design.arr_item=obj_ini.obj_design.arr_item;
        if(this.obj_design.arr_item===undefined){this.obj_design.arr_item=[];}      

        if(this.obj_design.arr_item.length===0){
            this.obj_design.arr_item=[];
        }
        

        if(obj_ini.obj_design.str_nameEventClick){this.obj_design.str_nameEventClick=obj_ini.obj_design.str_nameEventClick;}//this will usually be set by the container
        if(obj_ini.obj_design.str_valueEventClick){this.obj_design.str_valueEventClick=obj_ini.obj_design.str_valueEventClick;}//this will usually be set by the container
        
        if(obj_ini.obj_design.str_nameEventChange){this.obj_design.str_nameEventClick=obj_ini.obj_design.str_nameEventChange;}//this will usually be set by the container
        if(obj_ini.obj_design.str_valueEventChang){this.obj_design.str_valueEventChange=obj_ini.obj_design.str_valueEventChange;}//this will usually be set by the container

        /*
        this.obj_design.str_nameEventClick=obj_ini.obj_design.str_nameEventClick;//this will usually be set by the container
        this.obj_design.str_valueEventClick=obj_ini.obj_design.str_valueEventClick;//this will usually be set by the container        
        
        this.obj_design.str_nameEventChange=obj_ini.obj_design.str_nameEventChange;
        this.obj_design.str_valueEventChange=obj_ini.obj_design.str_valueEventChange;
        //*/
        
        this.obj_design.str_linkId=obj_ini.obj_design.str_linkId;
        if(this.obj_design.str_linkId===undefined){this.obj_design.str_linkId=undefined;} 
        
        this.obj_design.bln_listenClick=obj_ini.obj_design.bln_listenClick;
        if(this.obj_design.bln_listenClick===undefined){this.obj_design.bln_listenClick=undefined;}        

        this.obj_design.bln_listenChange=obj_ini.obj_design.bln_listenChange;
        if(this.obj_design.bln_listenChange===undefined){this.obj_design.bln_listenChange=undefined;}        
        //END INITIALIZE DESIGN        
        
        //START INITIALIZE DOM PROPERTY
        this.obj_domProperty=obj_ini.obj_domProperty;                              
        //END INITIALIZE DOM PROPERTY

        //START INITIALIZE DOM ATTRIBUTE
        this.obj_domAttribute=obj_ini.obj_domAttribute;                              
        //END INITIALIZE DOM ATTRIBUTE
        
        //START INITIALIZE STYLE        
        /*
        DONT set str_height, str_width, str_padding on base object         
        AVOID specified values here. Leave them undefined. Allow sub class to overidde undefined.
        //*/
        this.obj_domStyle=obj_ini.obj_domStyle;
        //END INITIALIZE STYLE        

        //START INITIALIZE THEME
        this.obj_theme=obj_ini.obj_theme;                      
        //END INITIALIZE THEME
    }      
    
    fn_addItem(obj_ini){
        
        if(obj_ini==undefined){
            return;
        }
        
        let obj_item;
        let str_type, str_tag;                       

        

        str_type=obj_ini.obj_design.str_type;        
        
        
        
        try {                        
            obj_item = new (obj_ComponentMap.get(str_type))(obj_ini);            
        }        
        catch(err) {   
            console.log("SUBSTITUTING TAG: " + obj_ini.obj_design.str_type);
            obj_item = new (obj_ComponentMap.get("tag"))(obj_ini);            
        }
        
        str_type=obj_item.fn_getType();              
        str_tag=obj_item.fn_getTag();
        //create the dom with the informaiton saved into parent component

        obj_item.obj_holder.obj_container=this; 
        
        if(obj_item.obj_design.int_modeExecute===undefined){      //baseobjects will get parents modeExecute
            obj_item.obj_design.int_modeExecute=this.obj_design.int_modeExecute;              
        }       

        
        /*
        console.log("str_type: " + str_type);
        console.log("str_tag: " + str_tag);
        //*/
        
        let int_index, int_remove=0;        
        
        //Following options:            
        //START CREATE DOM ELEMENT
        //To Do
        //1. Creating Own Tag                 
        //2. Use Exisitng Tag and Allow/DisAllow manipulation of this e.g flex, padding etc
        //*/

        

        switch(str_type){
            case "tablerow":                                
                int_index=this.obj_design.arr_item.length;
                this.obj_design.arr_item.splice(int_index, int_remove, obj_item);                
                obj_item.dom_obj = this.dom_obj.insertRow();
                
            break;            
            case "tablecell":
                int_index=this.obj_design.arr_item.length;
                this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
                obj_item.dom_obj = this.dom_obj.insertCell();                
            break;                                    
            default:    

                
                switch(str_type){//.nodeType
                    case "textnode":
                        obj_item.dom_obj = document.createTextNode(obj_item.obj_design.str_content);                                                                                                                              
                        break;
                    case "comment":
                    obj_item.dom_obj = document.createComment(obj_item.obj_design.str_content);                                                      
                        break;
                    default:
                        obj_item.dom_obj = document.createElement(obj_item.obj_design.str_tag);                                                      
                        break;

                }                            
                obj_item.dom_objContent=obj_item.dom_obj;//potentially not necessary as this should be set in createSelf                    
                //POSITION DOM ELEMENT
                this.fn_positionItem(obj_item, obj_ini);
                //We need to get the item dom into the page, as fn_create_self may be overriden
        }
        //END CREATE DOM ELEMENT
        
        
        obj_item.fn_execute();        
                    
        return obj_item;
    }
    
    fn_isElement(){return this.dom_obj.nodeType===1;}

    fn_execute(){//overidden by component object - but not called by component object

        //if(!this.fn_isElement()){return;}        
        
        this.fn_createSelf();        

        this.fn_onOpenInstance();//overridden by component

        
    }        

    fn_createSelf(){//overidden, but should be called 
        

        //dom object must be in place by now

        if(!this.fn_isElement()){return;}

        let str_designMarker=obj_project.obj_design.str_prefix;//needs to go into design object
        
        this.dom_objContent=this.dom_obj;//can be overidden to be another than own dom obj
        
        this.dom_obj.setAttribute(str_designMarker + "id", this.obj_design.str_id);                    
        
        this.fn_setEventAttributes();        
        
        if(this.obj_design.str_linkId!==undefined){
            this.dom_obj.setAttribute("linkId", this.obj_design.str_linkId);                      
        }

        this.fn_setHTMLContent();

        //BY THIS POINT THE ITEM WILL HAVE AN ELEMENT, INSERTED IN THE DOM                
        this.fn_onLocateInDom();
        
    }
    fn_onLocateInDom(){//overidden to do nothing in project instance          
        //this is essential to fire on any published object.
        //called at end of create self
        //console.log(this.obj_design.str_type);
        this.fn_Listen();
    }    

    fn_onOpenInstance(){//not overidden by component
        
        if(this.obj_design.arr_item.length===0){
            //for component, if no server trip, (due to recordid=0), length will be zero. Otherwise , the server trip will have completed, arr_item will be full
            //other objects can have default add children methods
            //therefoere we avoid the need to overide this for component using intiIdRecord=0
            this.fn_createChildren();                        
        }
        else{
          this.fn_loadChildren();//if obj_design.arr_item is in place, eg from JSON seriolization
        } 
        
        
        this.fn_onLoad();
    }

    fn_initializePlugins(){//can be overidden        
        
        if(window.self!=window.top){
            if(this.obj_design.int_modeExecute<10){                                         
                this.fn_initializePluginDesign();//can be overidden
                this.obj_designDelegate.fn_setup();//must be 2 separatre functions
            }
        }
    }

    fn_initializePluginDesign(){//overidden by ProjectInstance and GridItem                
        this.obj_designDelegate=new DesignDelegate(this);
    }
    
    
    fn_onLoad(){//can be overriden , but should be called               

        if(this.obj_design.str_IdValidator!==undefined){//Used to inform load event for objects within the component environment
            this.obj_validator=obj_project.fn_findItemById(this.obj_design.str_IdValidator);             
            if(this.obj_validator){
                this.obj_validator.fn_validate(this);                        
            }
        }        
        this.fn_applyFeatures();

        this.fn_initializePlugins();                

        
        //this is the end of the object creation process
    }   
    
    fn_debugDesign(obj_design, str_title=""){                
        
        console.groupCollapsed(str_title);        
        console.log("int_idRecord: " + obj_design.int_idRecord);                
        console.log("str_id: " + obj_design.str_id);
        console.log("int_modeExecute: " + obj_design.int_modeExecute);                              
        console.log("str_name: " + obj_design.str_name);        
        console.log("str_type: " + obj_design.str_type);        
        console.log("str_tag: " + obj_design.str_tag);        
        console.log("str_nameEventClick: " + obj_design.str_nameEventClick);        
        console.log("str_valueEventClick: " + obj_design.str_valueEventClick);                              
        console.groupEnd();
    }
    fn_debugDom(dom_obj, str_title=""){                
        
        if(!dom_obj){
            console.log("dom_obj is not yet in place");                    
            return;
        }
        console.groupCollapsed(str_title);                
        console.log("outerHTML: " + dom_obj.outerHTML);                
        console.groupEnd();
    }    

    fn_debugItems(){

        let arr, obj_item
        arr=this.obj_design.arr_item;        
        this.fn_debug("DEBUG: " + this.obj_design.str_type);
        for(let i=0;i<arr.length;i++){
            obj_item=this.obj_design.arr_item[i];
            obj_item.fn_debugItems();
            
        }
        
    }

    fn_debug(str_title=""){                
        
        if(str_title===undefined){str_title="";}
        let str_name=this.obj_design.str_name;
        if(str_name===undefined){str_name="";}        
        if(str_name){str_title+=": " + str_name;}
        console.groupCollapsed(str_title);        
        console.log("typeof: " + typeof this);
        console.log("constructor: " + this.constructor.name);        
        this.fn_debugDesign(this.obj_design);      
        this.fn_debugDom(this.dom_obj);      
        console.groupEnd();
    }
    
    fn_debugAlert(){
        let s="";
        s+="typeof: " + typeof this + "\r";
        s+="str_id: " + this.obj_design.str_id + "\r";
        s+="str_type: " + this.obj_design.str_type + "\r";
        alert(s);
    }

    fn_listId(){

        let str_val, int_idRecord, str_delim;
        str_val="";
        str_delim=",";                
        int_idRecord=this.obj_design.int_idRecord;
        if(int_idRecord){                
            str_val=int_idRecord + str_delim;
        }
        return str_val;
    }

    fn_compileDependentId(){
        let str_val="";        
        str_val+=this.fn_listDependentId();//Get List of Compone Ids
        str_val=str_val.slice(0,-1);         
        return str_val;
    }

    fn_listDependentId(){        
        let str_val="";
        let arr=this.obj_design.arr_item;        
        for(let i=0;i<arr.length;i++){
            let obj_item=arr[i];
            if(obj_item.bln_isComponent){
                str_val+=obj_item.fn_listId();                
            }
            str_val+=obj_item.fn_listDependentId();
        }                
        return str_val;
    }

    fn_validIdHistory(){

        let int_id_record=this.obj_design.int_idRecord;
        if(!int_id_record){return true;}
        let obj_container=this.fn_getParentComponent();
        if(!obj_container){return true;}
        let bln_exist=this.fn_searchIdHistory(obj_container, int_id_record);
        if(bln_exist){return false;}
        return true;
    }

    fn_searchIdHistory(obj_item, str_listIdRecordSearch){
        
        
        let int_idRecord=obj_item.obj_design.int_idRecord;
        
            
        str_listIdRecordSearch+="";
        int_idRecord+="";
        let bln_val=obj_shared.fn_inStr(str_listIdRecordSearch, int_idRecord);        

        //console.log("str_listIdRecordSearch: " + str_listIdRecordSearch);
        //console.log("int_idRecord: " + int_idRecord);
        
        if(bln_val){            
            return true;
        }
        let obj_parent=obj_item.fn_getParentComponent();
        if(!obj_parent){return false;}

        return this.fn_searchIdHistory(obj_parent, str_listIdRecordSearch);        
    }
   

    fn_getParentComponent(){

        let obj_parent=this.obj_holder.obj_container;
        if(obj_parent && obj_parent.bln_isComponent){
            return obj_parent;
        }
        return false;

    }
    
    fn_positionItem(obj_item, obj_ini=""){  
        //Part of  the Add Item Process
        //allows child item to be inserted at a position in the item array and the parent container
        
        let int_index, int_remove=0;
        let int_index_before, int_index_after, int_index_object;

        let bln_InsertPosition=obj_ini.bln_InsertPosition;
        if(bln_InsertPosition===undefined){
            bln_InsertPosition=true;
        }
        if(obj_ini.obj_ItemTemplate){//to do with the mask maybe
            int_index_object = this.fn_findItemIndex(obj_ini.obj_ItemTemplate);
            if(bln_InsertPosition){//After
            int_index=int_index_object+1;
            obj_ini.obj_ItemTemplate.fn_positionAfter(obj_item);
            }
            else{//Before
            int_index=int_index_object;
            obj_ini.obj_ItemTemplate.dom_objContent.before(obj_item.dom_obj);

            }
            this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
        }
        else{
            if(bln_InsertPosition){//End
                int_index=this.obj_design.arr_item.length;
                this.dom_objContent.append(obj_item.dom_obj);                
            }
            else{//Start
                int_index=0;
                this.dom_objContent.prepend(obj_item.dom_obj);
            }                
            this.obj_design.arr_item.splice(int_index, int_remove, obj_item);
        }        

    }
    
    fn_popItem(){
        if(!this.dom_objContent.lastChild){
            return;
        }
        this.dom_objContent.removeChild(this.dom_obj.lastChild);
    }
    fn_positionAfter(obj_item){
        this.dom_objContent.after(obj_item.dom_obj);
    }    
    
    fn_removeChildren(){
        this.fn_removeItems();        
    }

    fn_createChildren(){//in boot phase , and often overidden        
    }

    fn_loadChildren(){

        let obj_ini, obj_item;
        let arr_ini;
        arr_ini=this.obj_design.arr_item.slice();//creat ea temporary copy of obj_design.arr_item which will contain "ini objects"
        this.obj_design.arr_item=[];//reset this arr item to empty array .

        arr_ini.forEach(obj_ini => {
            //console.log("fn_build: " + this.obj_design.str_type);
            //fn_enumerateObject(obj_ini, "BaseObject fn_loadChildren");            
            obj_item=this.fn_addItem(obj_ini);
         });

    } 
    
    fn_removeItems(){
        
        let arr, obj_item
        arr=this.obj_design.arr_item;
        this.fn_removeAllContent();
        for(let i=0;i<arr.length;i++){
            obj_item=this.obj_design.arr_item[i];            
            if(!obj_item){
                //alert("!obj_item");
            }
            else{
                this.fn_removeItem(obj_item);
            }
        }
    }     

    
    
    fn_removeItem(obj_item){

        obj_item.fn_removeItems();
        
        let arr, int_index;
        arr=this.obj_design.arr_item;
        int_index=0;
        if(arr.length){
            int_index=this.obj_design.arr_item.indexOf(obj_item);            
            if (int_index!==(-1)) {
                arr.splice(int_index, 1);                        
            }
            else{
                alert("should never see");//should never see
            }
        }
        obj_item.fn_onRemove();        
    }   
    
    
    fn_onRemove(){
        this.dom_obj.remove();        
    }

    fn_applyTheme(){

        if(this.obj_theme.borderRadius){
            this.fn_setStyleAttribute("borderRadius", this.obj_theme.borderRadius);          
        }
        if(this.obj_theme.fontFamily){
        this.fn_setStyleAttribute("fontFamily", this.obj_theme.fontFamily);                  
        }
    }

    fn_isContainer(){
        //equivalent of can have chlidren        
        return this.obj_design.bln_container;                
    }    
    
    fn_setContainer(bln_val){
        //equivalent of can have chlidren        
        this.obj_design.bln_container=bln_val;                
    }    
    fn_validate(){
    }
    
    fn_copyArray(arr_source){
        return arr_source.slice();
    }   
    
    fn_getLastItem(){        

        let obj_target=this.obj_holder.obj_lastItem;
        let arr_item=this.obj_design.arr_item;        
        if(!arr_item.length){return false;}        
        if(!obj_target){
            obj_target=arr_item[0];
        }
        return obj_target;
    } 
    fn_getEndItem(){
        
        let arr, obj_item;
        arr=this.obj_design.arr_item;        
        obj_item=this;
        if(arr.length){
            obj_item=arr[arr.length-1];                        
            obj_item=obj_item.fn_getEndItem();
        }
        return obj_item;
    }

    fn_getLimitLeft(){            
        
        let obj_container, int_index;
        obj_container=this.obj_holder.obj_container;
        if(!obj_container){return true;};
        int_index=obj_container.fn_findItemIndex(this);
        if(int_index<=0){return true;}            
        return false;
      }
      fn_getLimitRight(){                                
        let obj_container, int_index;
        obj_container=this.obj_holder.obj_container;
        if(!obj_container){return true;};
        int_index=obj_container.fn_findItemIndex(this);
        if(int_index===obj_container.obj_design.arr_item.length-1){return true;}
        return false;
      }      
      fn_getLimitTop(){                        
        let obj_container=this.obj_holder.obj_container;        
        if(!this.obj_holder.obj_container){return true;}      
        if(this===obj_project){return true;}                        
        return false;
      }
      fn_getLimitBottom(){                
        let arr=this.obj_design.arr_item;       
        let bln_has_grandChildren;
        if(!arr.length){return true;}        
        return false;
      }
      fn_getLimitGrandChild(){
        let bln_has_grandChild=this.fn_hasGrandChild();
        if(!bln_has_grandChild){return true;}        
        return false;
      }
      fn_hasGrandChild(){        
        let arr, int_val, obj_item;        
        arr=this.obj_design.arr_item;        
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];
            int_val=obj_item.obj_design.arr_item.length;
            if(int_val>0){return true;}
        }
        return false;
    }
    fn_setLevelLimit(){        
        
        let obj_levelLimit=new Object;              
        obj_levelLimit.obj_item=this;        
        obj_levelLimit.bln_limitTop=this.fn_getLimitTop();      
        obj_levelLimit.bln_limitLeft=this.fn_getLimitLeft();      
        obj_levelLimit.bln_limitRight=this.fn_getLimitRight();      
        obj_levelLimit.bln_limitBottom=this.fn_getLimitBottom();     
        obj_levelLimit.bln_limitGrandChild=this.fn_getLimitGrandChild();     
        obj_levelLimit.bln_hasAllLimit=false;
        if(obj_levelLimit.bln_limitTop && obj_levelLimit.bln_limitLeft && obj_levelLimit.bln_limitRight && obj_levelLimit.bln_limitBottom){
            obj_levelLimit.bln_hasAllLimit=true;            
        }
        this.obj_holder.obj_levelLimit=obj_levelLimit;        
    }

    
    
    fn_findItemById(str_id){        
        var obj_match, obj_item;
        if(this.obj_design.str_id===str_id){
            return this;
        }
        for(var i=0;i<this.obj_design.arr_item.length;i++){
            obj_item=this.obj_design.arr_item[i];            
            obj_match=obj_item.fn_findItemById(str_id);
            if(obj_match){
                break;
            }
        }
        if(obj_match){return obj_match;}
        return false;
    }
    fn_findItemIndex(obj_item){
        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            if(arr[i]==obj_item){
                return i;
            }
        }
        return -1;
    }


    fn_applyFeatures(){   
        //if(this.fn_getTag()==="H1"){alert("H1")}         
        this.fn_applyTheme();             
        this.fn_applyDomProperty();               
        this.fn_applyDomAttribute();
        this.fn_applyStyle();       
    }
    
    fn_applyDomProperty(){                     
        let arr_Property=Object.entries(this.obj_domProperty);      
        for (let [str_key, foo_val] of arr_Property) {           
            //console.log("PROPERTY: " + str_key + ": " + foo_val);          
            this.fn_setDomProperty(str_key, foo_val);            
        }        
    }

    fn_applyDomAttribute(){                     
        let arr_Property=Object.entries(this.obj_domAttribute);      
        for (let [str_key, foo_val] of arr_Property) {           
            //console.log("ATTRIB: " + str_key + ": " + foo_val);          
            this.fn_setDomAttribute(str_key, foo_val);        
            //this.dom_obj.setAttribute(str_key, foo_val);                                                      
        }        
    }
    
    fn_setDomProperty(str_name, str_value){ 

        if(str_name.toLowerCase()==="innertext" || str_name.toLowerCase()==="textcontent"){            
            this.dom_obj.innerText="";
            this.dom_obj.textContent="";
            this.dom_obj.innerText=str_value;
            this.dom_obj.textContent=str_value;
        }

        
        this.obj_domProperty[str_name]=str_value;        
        this.obj_domAttribute[str_name]=str_value;        
        
        if(str_value===false){            
            if(this.dom_obj){                                
                this.dom_obj[str_name]=undefined;                                      
            }
        }
        else{            
            this.dom_obj[str_name]=str_value;  
        }
    }    

    fn_setDomAttribute(str_name, str_value){        

        if(str_name.toLowerCase()==="innertext" || str_name.toLowerCase()==="textcontent"){            
            this.dom_obj.innerText="";
            this.dom_obj.textContent="";
            this.dom_obj.innerText=str_value;
            this.dom_obj.textContent=str_value;
        }

        this.obj_domProperty[str_name]=str_value;        
        this.obj_domAttribute[str_name]=str_value;        
        
        if(str_value===false){            
            if(this.dom_obj){                
                this.dom_obj.removeAttribute(str_name);       
            }
        }
        else{            
            this.dom_obj.setAttribute(str_name, str_value);                                                      
        }
    }
    
    fn_applyStyle(){        
        let arr_Property=Object.entries(this.obj_domStyle);      
        for (let [str_key, foo_val] of arr_Property) {           
          //console.log(str_key + ": " + foo_val);
          this.fn_setStyleAttribute(str_key, foo_val);          
        }
    }   

    fn_getStyleAttribute(str_name){        
        return this.obj_domStyle[str_name];
    }

    fn_setStyleAttribute(str_name, str_value){

        if(str_value==undefined){//allow undefined for most style attributes 
            if(str_name==="backgroundColor"){return;}
            if(str_name==="color"){return;}
        }

        switch(this.fn_getType()){
            case "grid":
                if(str_name==="backgroundColor"){                    
                    this.fn_setItemStyleAttribute("grid", "backgroundColor", str_value);        
                }
            break;
            default:
        }


        this.obj_domStyle[str_name]=str_value;
        let str_nameDom=str_name;
        this.dom_obj.style[str_nameDom]=str_value;
        if(str_nameDom==="pointerEvents"){
            //alert(this.dom_obj.style[str_nameDom]);
        }                          
        if(this.bln_debug){
            //console.log(this.obj_domProperty.innerText + ": " + str_nameDom + ": " + this.dom_obj.style[str_nameDom]);
        }        
    }

    fn_getDomAttribute(str_name){   
        return this.obj_domProperty[str_name];
    }
    fn_setDesignAttribute(str_name, foo_value){
        this.obj_design[str_name]=foo_value;              
    }

    fn_getBackgroundColor(){
        return this.dom_obj.style.backgroundColor;
      }        
    fn_setBackgroundColor(str_val){//overidden by component
          this.dom_obj.style.backgroundColor=str_val;
          this.obj_domStyle.backgroundColor=str_val;
    }        

    fn_getType(){                
        return this.obj_design.str_type.toLowerCase();
    }
    fn_getTag(){                
        return this.obj_design.str_tag.toLowerCase();
    }
    
    fn_setItemStyleAttribute(str_type, str_name, str_value){          

        let obj_item, arr;
        arr=this.obj_design.arr_item;        
        for(var i=0;i<arr.length;i++){
            obj_item=arr[i];                      
            if(obj_item.fn_getType()===str_type){                                
                obj_item.fn_setStyleAttribute(str_name, str_value);      
            }
            obj_item.fn_setItemStyleAttribute(str_type, str_name, str_value);
        }
    }
    
    fn_getHTMLContent(){        
        let str_content=this.obj_design.str_content;        
        return str_content;
    } 

    fn_setHTMLContent(str_content=""){        

        if(str_content===""){
            str_content=this.obj_design.str_content;
        }
        
        if(str_content===""){return;}
        if(!str_content){return;}
        if(str_content==="blank"){str_content=""}

        this.fn_removeAllContent();
        this.obj_design.str_content=str_content;
        this.dom_objContent.innerHTML=str_content;          
        if(this.bln_x){
            alert(this.dom_objContent.innerHTML);
        }        
    }        
    fn_removeAllContent(){        
        this.obj_design.str_content="";
        this.dom_objContent.innerHTML="";
        this.dom_objContent.data="";
        this.obj_design.arr_item=[];        
    }  
      
    fn_setEnabled(){                
        let obj_enabled=this.obj_holder.obj_enabled;
        if(!obj_enabled){return;}        
        if(!this.obj_domProperty.disabled){return;}
        let bln_val=this.fn_getDomAttribute("disabled");
        if(!bln_val){return;}

        this.fn_setDomAttribute("disabled", false);        
        this.fn_setStyleAttribute("pointerEvents", "auto");          
        this.fn_setStyleAttribute("cursor", obj_enabled.cursor);          
        this.fn_setStyleAttribute("color", obj_enabled.color);        
        this.fn_setStyleAttribute("backgroundColor", obj_enabled.backgroundColor);        
    }      

    fn_setDisabled(){  

        let bln_val=this.fn_getDomAttribute("disabled");
        if(bln_val){return;}
            
        this.obj_domProperty.disabled=true;
        
        let obj_enabled=new Object;
        obj_enabled=this.obj_holder.obj_enabled=new Object;        
        obj_enabled.pointerEvents=this.fn_getStyleAttribute("pointerEvents");                          
        obj_enabled.cursor=this.fn_getStyleAttribute("cursor");                  
        obj_enabled.color=this.fn_getStyleAttribute("color");                          
        obj_enabled.borderColor=this.fn_getStyleAttribute("borderColor");                  
        obj_enabled.backgroundColor=this.fn_getStyleAttribute("backgroundColor");                          
        
        this.fn_setDomAttribute("disabled", true);
        this.fn_setStyleAttribute("pointerEvents", "none");                  
        this.fn_setStyleAttribute("cursor", "default");                        
        this.fn_setStyleAttribute("color", "gray");         
    }
    fn_setInvisible(){                
        this.fn_setDisabled();
        this.fn_setStyleAttribute("borderColor", this.fn_getStyleAttribute("backgroundColor"));                  
    }
    fn_setVisible(){                
        this.fn_setEnabled();
        let obj_enabled=this.obj_holder.obj_enabled;
        this.fn_setStyleAttribute("borderColor", obj_enabled.borderColor);                          
    }    

    
    //START EVENT MANAGEMENT
    fn_click(){//if a component , this needs to be captured on the instance, as the default compoent is blank
        this.fn_event();                
    }
    fn_change(){               
        this.fn_event();                
    }
    fn_event(){          
        obj_project.obj_projectEvent=this;           
    }

    fn_setEventAttributes(){//allows parent component to catch the event via fn_event_call
        
        // this allows the event to be regsitered to a parent component, than the child object the event occurred on                                         
        if(this.obj_design.str_nameEventClick!==undefined){
            //this.fn_debug("fn_setEventAttributes str_nameEventClick");
            this.dom_obj.setAttribute(this.obj_design.str_nameEventClick, this.obj_design.str_valueEventClick);
        }
        
        // this allows the event to be regsitered to a parent component, than the child object the event occurred on                       
        if(this.obj_design.str_nameEventChange!==undefined){            
            this.dom_obj.setAttribute(this.obj_design.str_nameEventChange, this.obj_design.str_valueEventChange);
        }
    }    
    fn_Listen(){//allows this object to catch the event     
        
        let that=this;

        
        if(this.obj_design.bln_listenClick){                    
            this.dom_obj.addEventListener('click', function(e){                                       
                e.preventDefault();
                that.fn_click();
            });
        }
        
        if(this.obj_design.bln_listenChange){                    

            
            this.dom_obj.addEventListener('change', function(e){                                       
                e.preventDefault();
                
                that.fn_change();                
            });

            
            
        }
    }
    //END EVENT MANAGEMENT    
    
}//END CLS
//END RunTime/BaseObject.js
//START Runtime/Component.js
class component extends BaseObject {
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
    }
    fn_initialize(obj_ini){//COMPONENT: fn_initialize is called again upon component.openInstance from db
        super.fn_initialize(obj_ini);
        
        //START INITIALIZE DESIGN
        this.obj_design.int_idRecord=obj_ini.obj_design.int_idRecord;
        if(this.obj_design.int_idRecord==undefined){this.obj_design.int_idRecord=0;}
        if(this.obj_design.int_modeExecute===undefined){                        
            this.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;                        
            //if(window.name==="xdesign-target"){this.obj_design.int_modeExecute=this.obj_holder.int_modeReadOnly;}
            if(window.name==="xdesign-target"){
                this.obj_design.int_modeExecute=this.obj_holder.int_modeReadOnly;
                if(this.obj_design.int_idRecord===0){
                    this.obj_design.int_modeExecute=this.obj_holder.int_modeEdit;
                }
            }
        }  
        
        if(this.obj_design.bln_hiddenProjectPin==undefined){this.obj_design.bln_hiddenProjectPin=false;}
        if(this.obj_design.bln_toggleProjectPin==undefined){this.obj_design.bln_toggleProjectPin=false;}//Menu Button Only        
        
        
        if(this.obj_design.str_type==undefined){this.obj_design.str_type="component";}
        if(this.obj_design.str_tag==undefined){this.obj_design.str_tag="component";}                
        
        if(this.obj_design.str_name==undefined){
            this.obj_design.str_name="My " + this.obj_design.str_type;
            this.obj_design.str_name=obj_shared.fn_capitalizeTheFirstLetterOfEachWord(this.obj_design.str_name);
        }
        
        
        
        this.bln_isComponent=true;        
        
        //if(this.fn_isContainer()==undefined){this.fn_setContainer(true)};        
        if(this.obj_design.bln_container==undefined){
            this.fn_setContainer(true);
        }
        //this.fn_setContainer(true);
        
        
        
        this.obj_design.bln_listenClick=true;
        //END INITIALIZE DESIGN
    }

    fn_execute(){//overides base object execute        
        if(this.obj_design.int_idRecord){this.fn_openInstance();}//grab instance first and intiialize                
        this.fn_createSelf();//create self                
        this.fn_onOpenInstance();//run  baseobvject onopeninstance
    }      

    fn_openInstance(){//wont run on boot as will not have a record id        
        if(!this.fn_validIdHistory()){return;}
        let ObjectData=obj_InstanceJSONMap.get(parseInt(this.obj_design.int_idRecord));               
        if(!ObjectData || (ObjectData && !ObjectData.obj_design)){return;}//dont intialize with bank object        
        ObjectData.obj_design.int_modeExecute=this.obj_design.int_modeExecute;//Continuity of Mode                                
        this.fn_initialize(ObjectData);//initialize with self from db                                
    }
    //START COMPONENT OPERATION FUNCTIONS
    
    fn_validate(obj_item){ 
        let str_variableName=obj_item.obj_design.str_variableName;                
        if(str_variableName){
            //console.log("str_variableName: " + str_variableName);
            str_variableName=str_variableName.replace(/-/gi, "_");;        
            this.obj_holder["obj_" + str_variableName]=obj_item;           
            //console.log("this.obj_holder[obj_" + str_variableName + "]: " + this.obj_holder["obj_" + str_variableName]);
        }
    }

    

    
    /*
    fn_saveInstance(){

        //MARK MYSELF
        this.obj_holder.bln_markSave=true;
        this.fn_debug("fn_getSaved");

        let arr, obj_item, bln_allSaved;
        arr=this.obj_design.arr_item;        
        //ARE MY CHILDREN SAVED
        bln_allSaved=true;
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];
            if(!obj_item.obj_design.int_idRecord){
                obj_item.fn_debug("CHILD NOT SAVED");
                obj_item.fn_saveInstance();
                bln_allSaved=false;
                break;
            }
        }
        if(!bln_allSaved){
            return;
        }

        //SAVE
        //IF MY PARENT IS MARKED, TELL THEM
        let obj_designFile=obj_project.obj_holder.obj_designFile;
        let obj_ini=new Object;
        obj_ini.obj_instance=this;
        let obj_parent=this.fn_getParentComponent();        
        if(obj_parent && obj_parent.obj_holder.bln_markSave){
            obj_ini.str_IdValidator=obj_parent.obj_design.str_id;
            obj_ini.str_actionCallback="fn_saveInstance";
        }            
        obj_designFile.fn_save(obj_ini);
    }
    fn_getParentComponent(){

        let obj_parent=this.obj_holder.obj_container;
        if(obj_parent && obj_parent.bln_isComponent){
            return obj_parent;
        }
        return false;

    }
    //*/

    fn_getRecordStatus(){

        let arr, obj_item, bln_recordStatus;
        arr=this.obj_design.arr_item;
        
        if(this.bln_isComponent){
            if(!this.obj_design.int_idRecord){
                return false;
            }
        }      
        //*          
        for(let i=0;i<arr.length;i++){
            obj_item=arr[i];

            bln_recordStatus=obj_item.fn_getRecordStatus();
            if(!bln_recordStatus){
                obj_item.fn_debug("CHILD NOT SAVED");
                return false;
            }            
        } 
        //*/       
        return true;
    }    

    fn_setBackgroundColor(str_val, bln_propogate){
        //allows for component wide bg color change to propogate
        super.fn_setBackgroundColor(str_val);  
        if (!bln_propogate){return;}        
        let arr=this.obj_design.arr_item;
        for(let i=0;i<arr.length;i++){
            let obj_item=this.obj_design.arr_item[i];            
            obj_item.fn_setBackgroundColor(str_val, bln_propogate)
        }
    }    
    //START COMPONENT EVENT HANDLING - CONSIDER MOVING to BASEOBJECT IF NECESSARY
    fn_getvalueEvent(o_target, str_nameEvent){        
        let str_valueEvent=o_target.getAttribute(str_nameEvent);
        /*
        console.log(o_target.outerHTML);
        console.log("str_nameEvent: " + str_nameEvent);        
        console.log("str_valueEvent: " + str_valueEvent);
        //*/
        return str_valueEvent;
    }
    fn_event_call(str_nameEvent){
        let e, str_valueEvent;
        e=window.event;
        str_valueEvent=this.fn_getvalueEvent(e.target, str_nameEvent);
        if(!str_valueEvent){            
            str_valueEvent=this.fn_getvalueEvent(e.target.parentNode, str_nameEvent);
        }
        if(!str_valueEvent){
            return;
        }
        try{
            this[str_valueEvent]();
        }
        catch(e){
            alert("fn_event_call error: " + str_nameEvent + ": " + str_valueEvent);
            console.log(e);
        }
      }
    fn_click(){
        //this.fn_debug();
    }//overidden by the instance

    //END COMPONENT EVENT HANDLING
    //END COMPONENT OPERATION FUNCTIONS
}//END CLS
//END COMPONENT

//END Runtime/Component.js
//START RunTime/Debug.js
  class Debug {
    constructor() {      
    }        

    fn_debugServerResponse(Response, bln_expanded=false){        

        
        let str_title="DEBUG SERVER RESPONSE";
        //if(!bln_expanded){console.groupCollapsed(str_title);}
        //else{console.group(str_title);}
        console.group(str_title);

        console.log("Response.headers: " + Response.headers);
        console.log("Response.ok: " + Response.ok);
        console.log("Response.redirected : " + Response.redirected);
        console.log("Response.status : " + Response.status);
        console.log("Response.statusText : " + Response.statusText);
        console.log("Response.trailers : " + Response.trailers);
        console.log("Response.type : " + Response.type);
        console.log("Response.url : " + Response.url);
        console.log("Response.useFinalURL : " + Response.useFinalURL);
        //console.log("Response.body : " + Response.body);
        //console.log("Response.bodyUsed : " + Response.bodyUsed);
        //console.log("Response.formData : " + Response.formData());
        //console.log("Response.json : " + Response.json());
        //console.log("Response.text : " + Response.text());
        console.groupEnd();

    }
    
}

//END RunTime/Debug.js
//START RunTime/myJSON.js
class myJSON  {
    constructor() {      
    }
    fn_serialize(obj_myObject){                  
      let fn_serializeReplacer;      
      this.fn_serializeReplacer=this.fn_serializeReplacerDefault;
      if(obj_myObject.fn_serializeReplacer!==undefined){        
        this.fn_serializeReplacer=obj_myObject.fn_serializeReplacer;
      }            
      this.obj_myObject=obj_myObject;
      let str_json=JSON.stringify(obj_myObject, this.fn_serializeReplacer())
      str_json=str_json.replace("xcludex", );
      
      return str_json;      
    }
    fn_deserialize(str_json){      
      let obj_json={};
      try {
        obj_json=JSON.parse(str_json);
      } catch (error) {
          console.error("*****START ERROR myJSON DeSerialize*****");
          console.error("Error: " + error);
          console.error("str_json: " + str_json);
          console.error("*****END ERROR myJSON DeSerialize*****\n\n");
      }      
      return obj_json;
    }
    fn_serializeReplacerDefault = () => {
      //myJSON default serialize object
      
        const seen = new WeakSet();
        return (key, value) => {
          switch(key){
              case "obj_ini":
              return undefined;
              break;
          }
          //console.log(key + ": " + value);
          if (typeof value === "object" && value !== null) {

              //fn_enumerateObject(value, "myJSON fn_serializeReplacerDefault");
              //const found = this.arr_exclude.find(element => element === value);
              //if (found) {return "";}
              if (seen.has(value)) {
                return "circular";
                //return;
              }
              seen.add(value);
          }
          return value;
        };
    };
  }
  //END OF CLS myJSON

//END RunTime/myJSON.js
//START RunTime/Main.js
var  obj_project, obj_myJson, obj_shared, obj_boot, obj_holder;

obj_shared=new Shared;
obj_myJson=new myJSON(new Object);
obj_boot=new Holder;
obj_holder=new Holder;

document.addEventListener('DOMContentLoaded', (event) => {
  
  obj_project=new Project(obj_boot);      
  window.obj_project=obj_project;//expose main base object to window scope
  obj_project.fn_execute();  
});



//END RunTime/Main.js

/*id: 100//*/
/*type: RuntimeCode//*/
/*END COMPONENT//*/





/*START COMPONENT//*/
/*id: 180//*/
/*type: PublishtimeCode//*/

/*id: 180//*/
/*type: PublishtimeCode//*/
/*END COMPONENT//*/





/*START COMPONENT//*/
/*id: 340//*/
/*type: flex//*/
//START component/flex.js
  class flex extends component {
    constructor(obj_ini) {
      super(obj_ini); // call the super class constructor
    }    
    fn_initialize(obj_ini){
      super.fn_initialize(obj_ini);

      //START INITIALIZE DESIGN
      this.obj_design.str_type="flex";
      this.obj_design.str_tag="flex";      
      this.fn_setContainer(true);
      //END INITIALIZE DESIGN

      //START INITIALIZE STYLE
      this.obj_domStyle.display="flex";      
      if(this.obj_domStyle.backgroundColor===undefined){this.obj_domStyle.backgroundColor=obj_shared.fn_getRandomColor();}//no-wrap      
      if(this.obj_domStyle.flexWrap===undefined){this.obj_domStyle.flexWrap="wrap";}//no-wrap      
      if(this.obj_domStyle.height===undefined){this.obj_domStyle.height="100%";}
      if(this.obj_domStyle.width===undefined){this.obj_domStyle.width="100%";}
      if(this.obj_domStyle.padding==undefined){this.obj_domStyle.padding="10px";}       
      if(this.obj_domStyle.overflow==undefined){this.obj_domStyle.overflow="auto";}             
      //END INITIALIZE STYLE      
    }

}//END CLS
//END FLEX

//END component/flex.js

/*id: 340//*/
/*type: flex//*/
/*END COMPONENT//*/



//START AUTO GENERATED COMPONENT MAP
const obj_ComponentMap = new Map([['flex', flex]]);
//END AUTO GENERATED MAP




/*START COMPONENT//*/
/*id: 190//*/
/*type: TemplateCode//*/
//START RunTime/Project.js
class Project extends component{
    constructor(obj_ini) {
        super(obj_ini); // call the super class constructor
        
        /*
        THe use of this wrapper function allows items to be called form database , rather than hard-written into the code.        
        //e.g it allows the use of a simple Main procedure "new wrapper" which is name agnostic.
        //*/
    }    
    fn_initialize(obj_ini){        
        super.fn_initialize(obj_ini);
        
        //START INITIALIZE DESIGN        
        if(this.obj_design.int_idRecord==undefined){this.obj_design.int_idRecord=0;}
        this.obj_design.str_prefix="xDesign_";

        if(this.obj_design.str_name==undefined){this.obj_design.str_name="My Project";}

        this.obj_holder.bln_isRoot=true;      
        this.fn_setContainer(true);
        
        this.fn_loadBootVariables();
        //END INITIALIZE DESIGN

        //START INITIALIZE DOM PROPERTY                
        //END INITIALIZE DOM PROPERTY

        //START INITIALIZE DOM ATTRIBUTE
        //END INITIALIZE DOM ATTRIBUTE
        
        //START INITIALIZE STYLE
        //END INITIALIZE STYLE

        //START INITIALIZE THEME        
        if(this.obj_theme.backgroundColor==undefined){this.obj_theme.backgroundColor="#2b2c34";}
        if(this.obj_theme.forgroundColor==undefined){this.obj_theme.forgroundColor="#414141";}        
        //if(this.obj_theme.forgroundColor==undefined){this.obj_theme.forgroundColor="green";}        
        if(this.obj_theme.highlightColor==undefined){this.obj_theme.highlightColor="white";}                
        if(this.obj_theme.borderRadius===undefined){this.obj_theme.borderRadius="4px";}
        if(this.obj_theme.fontFamily===undefined){this.obj_theme.fontFamily="Helvetica, Arial, sans-serif";}
        //as publish will never be saved we can move theme to holder
        //END INITIALIZE THEME
        
        //this.obj_design.bln_preventSave=true;//can this remain off here.
    }       
    fn_loadBootVariables(){
        let params;
        params = new URLSearchParams(location.search.toLowerCase());                
        let str_mode=params.get('mode');
        switch(str_mode){            
            case "edit":
                this.obj_design.int_modeExecute=this.obj_holder.int_modeEdit;                                
                break;         
            default:
                this.obj_design.int_modeExecute=this.obj_holder.int_modeRuntime;
        }                        
        
        let int_idRecord;        
        int_idRecord=this.obj_design.int_idRecord;
        this.obj_design.int_idRecord=parseInt(int_idRecord);

        /*
        alert("fn_loadBootVariables this.obj_design.int_idRecord: " + this.obj_design.int_idRecord);
        alert("fn_loadBootVariables this.obj_design.int_modeExecute: " + this.obj_design.int_modeExecute);
        //*/

    }

    
    
    
    fn_createSelf(){        
        this.fn_setTagOption();
        super.fn_createSelf();        
    }        
    
    fn_applyTheme(){//for the moment empty to prevent theme being uncessily applied, needs theme moved to obj_holder        
    }       
    fn_initializePluginDesign(){          
        this.obj_designDelegate=new DesignDelegateProjectInstance(this);          
        this.obj_designDelegate.fn_setup();                
    }  
    fn_applyTheme(){
        //this.fn_setBackgroundColor(this.obj_theme.backgroundColor, true);

        //apply theme to all child objects of type grid and griditem
        this.fn_setItemStyleAttribute("grid", "backgroundColor", this.obj_theme.backgroundColor);
        this.fn_setItemStyleAttribute("griditem", "backgroundColor", this.obj_theme.forgroundColor);        
     } 
     fn_viewInBrowser(){
        let o=window.open("../../myProject/", "xDesignViewInBrowser");
        if(o){o.focus()}
    }   
    fn_setName(str_value){
        if(!str_value){return;}        
        this.obj_design.str_name=str_value;
        //this.fn_setTag(str_value);        
    }    
    fn_setType(str_value){           
        if(!str_value){return;}
        this.obj_design.str_type=str_value;//will change the required class name that the template class will extend        
    }    
    fn_setTag(str_value){           
        if(!str_value){return;}
        this.obj_design.str_tag=str_value;//wont have any material effect        
    }    
    fn_setBackgroundColor(str_val, bln_propogate){
        super.fn_setBackgroundColor(str_val, false);
    }
    fn_themeInstance(){

        super.fn_applyTheme();
        this.obj_theme.backgroundColor=obj_shared.fn_getRandomColor();
        this.obj_theme.forgroundColor=obj_shared.fn_getRandomColor();
        this.fn_applyTheme();
     }     
     //END Project Instance Functions

     fn_setTagOption(){

        /*COMPONENT TAG    
        //Following options for Project Wrapper:            
        1. Use No Tag
        1. Creating A Tag                 
        2. Use Exisitng Tag and Allow/DisAllow manipulation of this e.g flex, padding etc
        //*/
        
        //Create own publish tag 
        //If used, publish does create its own tag , which will prevent any ammendments being made to its  parent HTML        
        //POSITION SELF
        this.dom_obj = document.createElement(this.obj_design.str_tag);                          
        //APPLIES ONLY TO PUBLISH AS IT IS THE ONLY ITEM THAT IS NOT INSERTED VIA ADDITEM
        //now position element in parent Dom        
        let dom_container=this.fn_getDocumentTag();
        dom_container.append(this.dom_obj);             
        //POSITION SELF
        
        
    }    
    
    fn_getDocumentTag(){
        let dom_element;                
        if(this.obj_design.str_idDocumentTag!==undefined){
            dom_element=document.getElementById(this.obj_design.str_idDocumentTag);
        }        
        if(dom_element===undefined){
            dom_element=document.body;        
        }
        return dom_element;        
    }         
  }//END OF CLS

  /*START DESIGN BOOT VARIABLE//*/
obj_boot.obj_design.int_idRecord=2580; 
/*END DESIGN BOOT VARIABLE//*/
//END RunTime/Project.js

/*id: 190//*/
/*type: TemplateCode//*/
/*END COMPONENT//*/




/*START INSTANCE JSON MAP//*/
var obj_InstanceJSONMap = new Map([
[2575, {"obj_design":{"str_type":"flex","str_name":"My Flex","int_idRecord":"2575","bln_container":true,"str_id":"myId_42639333","str_tag":"flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(154,208,59)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[2576, {"obj_design":{"str_type":"flex","str_name":"My Flex","int_idRecord":"2576","bln_container":true,"str_id":"myId_67919184","str_tag":"flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"2575","str_tag":"flex","bln_container":true,"str_id":"myId_01868980","str_name":"My Component","str_type":"flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(83,60,133)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(138,178,99)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[2577, {"obj_design":{"str_type":"flex","str_name":"My Flex","int_idRecord":"2577","bln_container":true,"str_id":"myId_92192222","str_tag":"flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"2576","str_tag":"flex","bln_container":true,"str_id":"myId_49994830","str_name":"My Component","str_type":"flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(235,167,173)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(7,36,197)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[2578, {"obj_design":{"str_type":"flex","str_name":"My Flex","int_idRecord":"2578","bln_container":true,"str_id":"myId_22908909","str_tag":"flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"2577","str_tag":"flex","bln_container":true,"str_id":"myId_29708088","str_name":"My Component","str_type":"flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(35,40,180)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(120,254,98)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[2579, {"obj_design":{"str_type":"flex","str_name":"My Flex","int_idRecord":"2579","bln_container":true,"str_id":"myId_87269809","str_tag":"flex","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"2578","str_tag":"flex","bln_container":true,"str_id":"myId_00018220","str_name":"My Component","str_type":"flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(95,208,173)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(94,91,74)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true,"dom_obj":{}}],
[2580, {"obj_design":{"int_idRecord":2580,"bln_container":true,"str_id":"myId_56021595","str_name":"My Component","str_type":"component","str_tag":"component","str_content":"","arr_item":[{"obj_design":{"int_idRecord":"2579","str_tag":"flex","bln_container":true,"str_id":"myId_66655919","str_name":"My Component","str_type":"flex","str_content":"","arr_item":[],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{"display":"flex","backgroundColor":"rgb(196,171,115)","flexWrap":"wrap","height":"100%","width":"100%","padding":"10px","overflow":"auto"},"obj_theme":{},"bln_isComponent":true}],"bln_listenClick":true,"bln_hiddenProjectPin":false,"bln_toggleProjectPin":false,"str_prefix":"xDesign_","bln_projectPin":true,"bln_palettePin":false},"obj_domProperty":{},"obj_domAttribute":{},"obj_domStyle":{},"obj_theme":{"backgroundColor":"#2b2c34","forgroundColor":"#414141","highlightColor":"white","borderRadius":"4px","fontFamily":"Helvetica, Arial, sans-serif"},"bln_isComponent":true,"dom_obj":{}}]
]);
/*END INSTANCE JSON MAP//*/


