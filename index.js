var loaderUtils = require('loader-utils');

module.exports = function(source) {

	this.cacheable && this.cacheable(true);
	this.addDependency(this.resourcePath);

	var key = this.data.key;
	var cb = this.async();

	if (typeof this.options[key] !== 'function') {
		var err = new Error('this.options.["' + key + '"] is not a function' );
		cb(err);
		throw err;
	}

	this
		.options[key](source, this)
		.then(function(nextSource) {
			cb(null, nextSource);
		});
};

module.exports.pitch = function(prev, next, data) {
	this.cacheable && this.cacheable(true);

	var query = loaderUtils.parseQuery(this.query);

	if(!query.key) {
		throw new Error('key is a required param for async loader');
	}

	data.key = query.key;

};
