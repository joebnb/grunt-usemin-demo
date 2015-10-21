/**
 * grunt config
 * @author:煜宸
 * @date:2015-10-13
 * @param           {na} grunt n
 * @return          {na}       n
 */
module.exports = function(grunt){
	/**
	 * load npm tasks
	 */
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('time-grunt');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-rev');

	require('time-grunt')(grunt);
	/**
	 * global config
	 */
	var config = {
		src:'src',
		dest:'dist',
		tmp:'tmp',
		date:function(){
			return date.getTime();
		}
	}
	/**
	 * grunt confing
	 */
	grunt.initConfig({
		config:config,
		pkg:grunt.file.readJSON('package.json'),
		copy:{
			useminhtml:{
				expand:true,
				cwd:'<%= config.src %>/',
				src:['**/*.{html,htm}'],
				dest:'<%= config.dest %>/'
			},
			image:{
				expand:true,
				cwd:'<%= config.src%>/',
				src:['**/*.{jpg,png,gif}'],
				dest:'<%= config.dest %>'
			},
			independentjs:{	
				src:'<%=  config.src %>/js/independent/independent.js',
				dest:'<%= config.dest %>/js/independent/independent.js'
			}
		},
		clean:{
			tmp:{
				src:['<%= config.tmp %>']
			},
			build:{
				tasks:['clean:tmp'],
				src:['<%= config.dest %>']
			}
		},
		useminPrepare:{
			options:{
				dest:'<%= config.dest %>/',
				staging:'<%= config.tmp %>/'
			},
			html:['<%= config.src %>/**/*.{html,htm}'],

		},
		usemin:{
			options:{
				assetsDirs:['<%= config.dest %>/{,css,js/independent,image}'],
				patterns: {
					js:[
						[/(bower\.png)/gm, 'replace bower.png with revved file'],
						[/(independent\.js)/gm,'replace bower.png with revved file']
					],
					css:[
						[/(bower\.png)/m, 'replace bower.png with revved file'],
					]
			    }
			},
			js:['<%= config.dest %>/**/*.js'],
			html:['<%= config.dest %>/**/*.{htm,html}'],
			css:['<%= config.dest %>/**/*.css'],
			
		},
		rev:{
			options:{
				algorithm: 'md5',
			    length: 8,
			},
			file:{
		    	src:['<%= config.dest %>/**/*.{js,css,png}'],
		    }
		},
		uglify:{
			options:{
				banner:'/* 这里的设置项是全局的\n   <%= pkg.name %>   yuchen.cb */\n ',
			}
		},
		cssmin:{
			options:{

			}
		}
	});

	/**
	 * register grunt task
	 */
	//grunt.registerTask('sassc',['sass:compile'])
	//grunt.registerTask('watchsass',['watch:sass']);
	grunt.registerTask('build',[
		'clean:build',
		'copy:useminhtml',
		'copy:image',
		'copy:independentjs',
		'useminPrepare',
		'concat:generated',
		'uglify:generated',
		'cssmin:generated',
		'rev',
		'usemin'
	])




}