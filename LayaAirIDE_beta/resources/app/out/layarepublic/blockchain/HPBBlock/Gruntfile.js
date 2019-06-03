'use strict';  

module.exports = function (grunt) {  

    // Project configuration.  
    grunt.initConfig({  

         connect: {

          options: {
            port: 8080,
            hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
            livereload: 35729  //声明给 watch 监听的端口
          },

          server: {
            options: {
              open: true, //自动打开网页 http://
              base: [
                './templates'  //主目录
              ]
            }
          }
    },

   

      concat: {  
        options: {  
        },  
        dist: {  
          src: [
                'templates/libs/laya.core.min.js',
                'templates/libs/laya.webgl.min.js' ,
                'templates/libs/laya.filter.min.js',
                'templates/libs/laya.particle.min.js',
                'templates/libs/laya.ani.min.js',
                'templates/libs/laya.ui.min.js',
                'templates/libs/laya.html.min.js',
                'templates/libs/laya.tiledmap.min.js',
                'templates/libs/laya.laya.pathfinding.min.js'

                ],//src文件夹下包括子文件夹下的所有文件  
          dest: 'templates/libs/all_lib.js'//
        }  
    },  

    watch: {
          livereload: {
            options: {
              livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
            },

            files: [  //下面文件的改变就会实时刷新网页
              'src/*.*',
            ],
            tasks: ['browserify'/*,'minify'*/]
          }
     },

    
     uglify: {
        my_target: {
          files: {
            'templates/bundle.js': ['templates/bundle.js'],
            'templates/libs/all_lib.min.js': ['templates/libs/all_lib.js']
          }
        }
    },
    

    shell: {
        options: {
            stderr: false
        },
        target: {
            command: 'bash onlycomplie.sh'
        },

    } 

    });

    grunt.registerTask('serve', [
        //'shell',
        'concat',
        'uglify',
        'connect:server',
        'watch'
    ]);

    
    grunt.registerTask('browserify',['shell']);
    grunt.registerTask('minify',['concat','uglify']);


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-concat');  

}
