////////////////////////////////////////////////////////////////////////

//////////////////        Mock : keywords          /////////////////////

////////////////////////////////////////////////////////////////////////
const move = "avance";
const left = "gauche";
const pickToken = "prend_un_jeton";
const dropToken = "pose_un_jeton";

const defineInstruction = "définir";
const ifInstruction = "si";
const elseifInstruction = "sinon_si";
const elseInstruction = "sinon";
const whileInstruction = "tant_que";
const repeatInstruction = "répéter";
const timesInstruction = "fois";

const wallFace = "mur_en_face";
const wallLeft = "mur_a_gauche";
const wallRight = "mur_a_droite";
const onToken = "sur_un_jeton";
const hasToken = "a_des_jetons";
const faceNorth = "regarde_nord";
const faceSouth = "regarde_sud";
const faceEast = "regarde_est";
const faceWest = "regarde_ouest";

const orOpe = "ou";
const andOpe = "et";

var conditions = [wallFace,wallLeft,wallRight,onToken,hasToken,faceNorth,
                  faceSouth,faceEast,faceWest];
var operators = [orOpe, andOpe];
////////////////////////////////////////////////////////////////////////

///////////////////////        REGEX          //////////////////////////

////////////////////////////////////////////////////////////////////////
const conditionsRegex = wordRegexp(conditions);
const operatorsRegex = wordRegexp(operators);

const defineRegex = /^([a-zé]+)\s+([a-z_-]+)\s*:\s*$/;
const structureRegex = /^([a-z_]+)\s+([a-z_\s!\(\)]+)\s*:\s*$/;
const elseStructureRegex = /^([a-z]+)\s*:\s*$/;
const repeatStructureRegex = /^([a-zé_]+)\s+(\d+)\s([a-z_]+)\s*:\s*$/;

const moveRegex = wordRegexpSingle(move);
const leftRegex = wordRegexpSingle(left);
const pickTokenRegex = wordRegexpSingle(pickToken);
const dropTokenRegex = wordRegexpSingle(dropToken);

const indentRegex = /^\s{2}/;
const otherInstructionRegex = /^([a-z]+)$/;
var textArray = [];


////////////////////////////////////////////////////////////////////////

//////////////////        Program sample          /////////////////////

////////////////////////////////////////////////////////////////////////

textArray.push("avance");//0
textArray.push("gauche");//2
textArray.push("si (mur_en_face ou sur_un_jeton):");//3
textArray.push("  gauche");//3
textArray.push("  si regarde_nord:");//3
textArray.push("    gauche");//3
textArray.push("    répéter 10 fois:");//7
textArray.push("      avance");//7
textArray.push("sinon_si !(a_des_jetons ou mur_en_face):");//3
textArray.push("  gauche");//3
textArray.push("définir yo:");//3
textArray.push("  gauche");//4
textArray.push("  gauche");//5
textArray.push("  gauche");//6
textArray.push("avance");//7
textArray.push("définir uturn:");//3
textArray.push("  gauche");//6
textArray.push("  tant_que !(a_des_jetons ou mur_en_face):");//1
textArray.push("    avance");//1
textArray.push("  gauche");//6
textArray.push("  avance");//7
textArray.push("uturn");//7

////////////////////////////////////////////////////////////////////////

//////////////////        Launch program          //////////////////////

////////////////////////////////////////////////////////////////////////


var spaceIndent = 2;
var newInstructions = new Map();
var execute = [];

var state = {defLine:-1, lvl:0, parent:-1};

try{
  parseAll(textArray, state);
}catch(error){
  console.error(error);
}

console.log("execute :");
console.log(execute);
console.log(newInstructions);


////////////////////////////////////////////////////////////////////////

///////////////        Main parsing function          //////////////////

////////////////////////////////////////////////////////////////////////

function parseAll(array, state){
  var i=0;
  var startLine = getStartLine(state);

  while(i<array.length){

    ////////////
    //////////// move, left, pickToken, dropToken
    ////////////
    if(moveRegex.test(array[i])){
      execute.push(
        {type:"instruction", name:move, line:startLine+i,
        valid:true, subdefine:(state.defLine!=-1), parent:state.parent});
    }else if(leftRegex.test(array[i])){
      execute.push(
        {type:"instruction", name:left, line:startLine+i,
        valid:true, subdefine:(state.defLine!=-1), parent:state.parent});
    }else if(pickTokenRegex.test(array[i])){
      execute.push(
        {type:"instruction", name:pickToken, line:startLine+i,
        valid:true, subdefine:(state.defLine!=-1), parent:state.parent});
    }else if(dropTokenRegex.test(array[i])){
      execute.push(
        {type:"instruction", name:dropToken, line:startLine+i,
        valid:true, subdefine:(state.defLine!=-1), parent:state.parent});

    ////////////
    //////////// DEFINE
    ////////////
  }else if(defineRegex.test(array[i]) && (array[i].match(defineRegex))[1] == defineInstruction){
      var ar = array[i].match(defineRegex);
      var name = ar[2];
      if(state.lvl!=0){
        execute.push(
          {type:"define", name:name, line:startLine+i, valid:false, parent:-1});
        throw "define must be at level 0"
      }
      execute.push(
        {type:"define", name:name, line:startLine+i, valid:true, parent:-1});
      try{
        var nextIndex = parseDefine(array, name, i, state);
      }catch(error){
        throw error;
        return;
      }
      if(nextIndex >=i) i=nextIndex-1;
      else throw "Error parsing define";

    ////////////
    //////////// WHILE LOOP
    ////////////
    }else if(structureRegex.test(array[i])
              && (array[i].match(structureRegex))[1]==whileInstruction){
        var whileline = array[i].match(structureRegex);

          var condObj = conditionObject(whileline[2]);
          execute.push(
            {type:"structure", category:"while", condition:condObj,
            line:startLine+i, valid:true,
            subdefine:(state.defLine!=-1), parent:state.parent});
          try{
            var nextIndex = parseLoop(array, i, state);
          }catch(error){
            throw (error);
            return;
          }
          if(nextIndex >=i) i=nextIndex-1;
          else throw "Error parsing while content";

      ////////////
      //////////// REPEAT LOOP
      ////////////
    }else if(repeatStructureRegex.test(array[i])
          && (array[i].match(repeatStructureRegex))[1]==repeatInstruction
          && (array[i].match(repeatStructureRegex))[3]==timesInstruction){

      var repeatline = array[i].match(repeatStructureRegex);
      var number = repeatline[2];
      if(number>0){
        execute.push(
          {type:"structure", category:"repeat", times:number,
          line:startLine+i, valid:true,
          subdefine:(state.defLine!=-1), parent:state.parent});
        try{
          var nextIndex = parseLoop(array, i, state);
        }catch(error){
          throw (error);
          return;
        }
        if(nextIndex >=i) i=nextIndex-1;
        else throw "Error parsing repeat content";

      }else{
        execute.push(
          {type:"structure", category:"repeat", times:number,
          line:startLine+i, valid:false,
          subdefine:(state.defLine!=-1), parent:state.parent});
        throw "repeat must get strict positive number";
      }

    ////////////
    //////////// IF
    ////////////
    }else if(structureRegex.test(array[i])
              && (array[i].match(structureRegex))[1]==ifInstruction){
      var ifline = array[i].match(structureRegex);

        var condObj = conditionObject(ifline[2]);
        execute.push(
          {type:"structure", category:"if", condition:condObj,
          line:startLine+i, valid:true,
          subdefine:(state.defLine!=-1), parent:state.parent});
        try{
          var nextIndex = parseIf(array, i, state, "if");
        }catch(error){
          throw (error);
          return;
        }
        if(nextIndex >=i) i=nextIndex-1;
        else throw "Error parsing if content";

    ////////////
    //////////// ELSE IF
    ////////////
  }else if(structureRegex.test(array[i])
            && (array[i].match(structureRegex))[1] == elseifInstruction){
      // only parseIf() function should parse "else if" instruction
      throw "else if without if";

    ////////////
    //////////// ELSE
    ////////////
    }else if(elseStructureRegex.test(array[i])
            && (array[i].match(elseStructureRegex))[1] == elseInstruction){
      // only parseIf() function should parse "else" instruction
      throw "else without if";
    }else{
      var other = array[i].match(otherInstructionRegex);
      if(other!=null){
        if((newInstructions.get(other[1])!=null)){
          execute.push(
            {type:"custom_instruction", name:other[1], line:startLine+i,
            valid:true, subdefine:(state.defLine!=-1), parent:state.parent});
        }else{
          execute.push(
            {type:"unknown", name:other[1], line:startLine+i,
            valid:false, subdefine:(state.defLine!=-1), parent:state.parent});
          throw "unkown instruction : " + array[i];
        }
      }else{
        execute.push(
          {type:"unknown", name:array[i], line:startLine+i,
          valid:false, subdefine:(state.defLine!=-1), parent:state.parent});
        throw "unkown expression : " + array[i];
      }
    }
    i++;
  }
}

////////////////////////////////////////////////////////////////////////

////////////        Structures parsing functions          //////////////

////////////////////////////////////////////////////////////////////////

////////////        If

function parseIf(array, i, state, category){
  var j = i+1;
  var subInstructions = [];
  var str;
  var startLine = getStartLine(state);
  //update state
  var newState = {defLine:state.defLine,
                  lvl:1, parent:startLine+i};

  while(j<array.length){
    if(compareLvl(array[j], 1)>=0){
      str = array[j].substring(spaceIndent);
      subInstructions.push(str);
      j++;
    }else{
      break;
    }
  }
  if(j==i+1){
    throw "no instructions inside "+category;
  }else{
    parseAll(subInstructions, newState);

    if(structureRegex.test(array[j])
        && (array[j].match(structureRegex))[1]==elseifInstruction){
      if(category=="else"){
        execute.push(
          {type:"structure", category:"elseif", condition:elseifline[2],
          line:startLine+j, valid:false,
          subdefine:(state.defLine!=-1), parent:state.parent});

        throw "can't have else if after else";
      }
      var elseifline = array[j].match(structureRegex);
      var condObj = conditionObject(elseifline[2]);
      execute.push(
        {type:"structure", category:"elseif", condition:condObj,
        line:startLine+j, valid:true,
        subdefine:(state.defLine!=-1), parent:state.parent});
      return parseIf(array, j, state, "elseif");
    }else if(elseStructureRegex.test(array[j])
              && (array[j].match(elseStructureRegex))[1] == elseInstruction){
      if(category=="else"){
        execute.push(
          {type:"structure", category:"else",
          line:startLine+j, valid:false,
          subdefine:(state.defLine!=-1), parent:state.parent});
        throw "can't have else after else";
      }
      execute.push(
        {type:"structure", category:"else",
        line:startLine+j, valid:true,
        subdefine:(state.defLine!=-1), parent:state.parent});

      return parseIf(array, j, state, "else");
    }
  }
  return j--;
}

////////////        While

function parseLoop(array, i, state){
  var j = i+1;
  var insideLoop = [];
  var str;
  var startLine = getStartLine(state);
  var newState = {defLine:i, lvl:1, parent:startLine+i};

  while(j<array.length){
    if(compareLvl(array[j], 1)>=0){
      str = array[j].substring(newState.lvl*spaceIndent);
      insideLoop.push(str);
    }else{
      break;
    }
    j++;
  }
  if(j==i+1){
    throw "no instructions inside loop " + array[i].type + " " + array[i].category;
  }
  parseAll(insideLoop, newState);
  return j--;
}
////////////        Define

function parseDefine(array, inst, i, state){
  var j = i+1;
  var newInstruction = [];
  var str;
  var newState = {defLine:i, lvl:1, parent:state.parent};

  while(j<array.length){
    if(compareLvl(array[j], 1)>=0){
      str = array[j].substring(newState.lvl*spaceIndent);
      newInstruction.push(str);
    }else{
      break;
    }
    j++;
  }
  if(j==i+1){
    throw "no instructions inside define";
  }
  newInstructions.set(inst, i);
  parseAll(newInstruction, newState);
  return j--;
}


////////////////////////////////////////////////////////////////////////

///////////////////        Utils functions          ////////////////////

////////////////////////////////////////////////////////////////////////

// return negative value if less indented
// return positif value if more indented
// return 0 if same indentation
function compareLvl(str, level){
  var l = 0;
  while(indentRegex.test(str)){
    str = str.substring(spaceIndent);
    l++;
  }
  return l-level;
}

function wordRegexp(words) {
  return new RegExp("^((" + words.join(")|(") + "))\\b");
}
function wordRegexpSingle(word) {
  return new RegExp("^" + word + "$\\b");
}

function getStartLine(state){
  if(state.parent!=-1){
    return state.parent+1;
  }else if(state.defLine!=-1){
    return state.defLine+1;
  }else{
    return 0;
  }
}


////////////////////////////////////////////////////////////////////////

/////////////////        Condition parsing          ///////////////////

////////////////////////////////////////////////////////////////////////

////////////        Calling parser with formatted array
function conditionObject(str){
  if(bracketsAreValid(str)){
    str = str.trim();
    str = removeExtraBrackets(str);
    str = str.replace(/\(/g, " ( ");
    str = str.replace(/\)/g, " ) ");
    str = str.replace(/!/g, " ! ");
    str = str.replace(/\s+/g, " "); //replace several white space by one
    str = str.trim();
    var array = str.split(" ");

    return parseCondition(array);
  }else{
    throw ("invalid condition : bracket mismatch");
    return null;
  }
}

////////////        Parser for conditions

function parseCondition(array){
  //Stop
  if(array==null || array.length==0){
    throw "invalid condition : no condition";
    return null;
  }else if(array.length==1){
    if(conditionsRegex.test(array[0])){
      return array[0];
    }else{
      throw "invalid condition : " + array[0];
      return null;
    }
  }else if(array.length==2 && array[0]=='!'){
    return {ope:"!", left:parseCondition(array.slice(1,2)), right:null};
  }

  //Propagation
  var left, right, ope;
  var opeIndex = 0, leftStartIndex = 0, rightStartIndex;
  var leftObject = null, rightObject = null;

  //not ope
  if(array[0]=='!') leftStartIndex++;

  //array starts with open bracket
  if(array[leftStartIndex]=='('){
    left = betweenBrackets(array.slice(leftStartIndex,array.length));
    opeIndex = leftStartIndex+left.length+2;
  }else{ //array starts with single expression
    left = array.slice(leftStartIndex,leftStartIndex+1);
    opeIndex = leftStartIndex+1;
  }

  //not ope
  if(array[0]=='!' && opeIndex>=array.length-1){
    return {ope:"!", left:parseCondition(left), right:null}
  }else if(array[0]=='!' && opeIndex<array.length-1){
    leftObject = {ope:"!", left:parseCondition(left), right:null}
  }

  if(opeIndex<array.length-1){
    //Followed by operator
    if(operatorsRegex.test(array[opeIndex])){
      ope = array[opeIndex];
    }

    //Ending with right part
    rightStartIndex = opeIndex+1;
    if(array[rightStartIndex]=='!') rightStartIndex++;

    if(array[rightStartIndex]=='('){
      right = betweenBrackets(array.slice(rightStartIndex,array.length));
    }else{
      right = array.slice(rightStartIndex, array.length);
    }
    if(array[opeIndex+1]=='!'){
      rightObject = {ope:"!", left:parseCondition(right), right:null}
    }

  }

  //in case we've got some "not" operator :)
  if(leftObject && rightObject){
    return {ope:ope, left:leftObject, right:rightObject};
  }else if(leftObject){
    return {ope:ope, left:leftObject, right:right?parseCondition(right):null};
  }else if(rightObject){
    return {ope:ope, left:left?parseCondition(left):null, right:rightObject};
  }
  return {ope:ope, left:left?parseCondition(left):null, right:right?parseCondition(right):null};
}


////////////        returns the inside of matching brackets

function betweenBrackets(array){
  var i = 0;
  var nbOpen = 0;
  var nbClose = 0;
  var array2 = [];
  do{
    if(array[i] == '('){
      nbOpen++;
    }else if(array[i] == ')'){
      nbClose++;
    }
    array2.push(array[i]);
    i++;
  }while(i<array.length && nbOpen>nbClose);
  if(nbOpen==nbClose){
    return array2.slice(1,array2.length-1);
  }else{
    throw ("invalid condition : brackets mismatch")
    return null;
  }

}

////////////        false if brackets are mismatched

function bracketsAreValid(str){
  var i = 0;
  var nbOpen = 0;
  var nbClose = 0;
  while(i<str.length && nbOpen>=nbClose){
    if(str[i] == '('){
      nbOpen++;
    }else if(str[i] == ')'){
      nbClose++;
    }
    i++;
  }
  return nbOpen==nbClose && i==str.length;
}

////////////        remove external brackets

function removeExtraBrackets(str){
  if(str[0]=='(' && str[str.length-1]==')'){
    return removeExtraBrackets(str.slice(1,str.length-1));
  }else{
    return str;
  }
}
