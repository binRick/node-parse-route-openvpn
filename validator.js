module.exports = function(item){
	if(! 'name' in item || 'networks' in item)
		return false;
	if(item.name.length<1)
		return false;
	return true;
};
