function hasClass( elements,cName ){  
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
};  
function addClass( elements,cName ){  
    if( !hasClass( elements,cName ) ){  
        elements.className += " " + cName;  
    };  
};  
function removeClass( elements,cName ){  
    if( hasClass( elements,cName ) ){  
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
    };  
};
//nav menu
function toggleMenu(obj){
	var _ul = obj.nextSibling.nextSibling;
	console.log(_ul);
	if( _ul.style.display !== "block" ){
		addClass(obj,"rotate90");
		_ul.style.display = "block";
	}
	else{
		removeClass(obj,"rotate90");
		_ul.style.display = "none";
	}
}