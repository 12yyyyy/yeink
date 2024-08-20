import{_ as s,c as i,o as a,a3 as e}from"./chunks/framework.ZS1GtFyN.js";const l="/assets/sandbox_error.C5JOCbC4.webp",t="/assets/startup_error.Dwdbwjad.png",h="/assets/nacos_pwd.DFIQIDO6.png",u=JSON.parse('{"title":"常见问题FAQ","description":"","frontmatter":{},"headers":[],"relativePath":"oj/deploy/faq.md","filePath":"oj/deploy/faq.md","lastUpdated":null}'),p={name:"oj/deploy/faq.md"},n=e('<h1 id="常见问题faq" tabindex="-1">常见问题FAQ <a class="header-anchor" href="#常见问题faq" aria-label="Permalink to &quot;常见问题FAQ&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>问题大纲：</p><ul><li>一、部署在Centos7系统中无法正常评测，如何解决？</li><li>二、部署时出现3306或80、443等端口号被占用</li><li>三、如何修改MySQL、Redis、Nacos的密码？</li></ul></div><h2 id="一、部署在centos7系统中无法正常评测-如何解决" tabindex="-1">一、部署在Centos7系统中无法正常评测，如何解决？ <a class="header-anchor" href="#一、部署在centos7系统中无法正常评测-如何解决" aria-label="Permalink to &quot;一、部署在Centos7系统中无法正常评测，如何解决？&quot;">​</a></h2><h4 id="_1-问题引用" tabindex="-1">1. 问题引用 <a class="header-anchor" href="#_1-问题引用" aria-label="Permalink to &quot;1. 问题引用&quot;">​</a></h4><ul><li><p>原HOJ仓库issue引用：<a href="https://gitee.com/himitzh0730/hoj/issues/I5HZNP" target="_blank" rel="noreferrer">本地构建没问题 centOs 7 下构建报如下错误</a></p></li><li><p><code>hoj-judgeserver</code>容器一直重启，<code>docker logs hoj-judgeserver</code>查看日志发现，启动Go-judge（Sandbox）报错：<code>prefork environment failed container: failed to start container fork/exec /proc/self/exe: invalid argument</code></p><p><img src="'+l+`" alt="sandbox启动报错日志"></p></li></ul><h4 id="_2-如何解决" tabindex="-1">2. 如何解决 <a class="header-anchor" href="#_2-如何解决" aria-label="Permalink to &quot;2. 如何解决&quot;">​</a></h4><p><strong>Tips：其实强烈建议换Ubuntu系统，但如果一定要使用CentOS7系统的话请看下面。</strong></p><p>由于hoj使用的判题机中的安全沙盒使用环境的特殊性，如果想在centos7系统中正常运行<code>hoj-judgeserver</code>服务，需要开启 user 命名空间来使用。</p><ul><li><p>永久性设置操作</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user.max_user_namespaces=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10000</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/sysctl.d/98-userns.conf</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reboot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> //</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 重启机器生效</span></span></code></pre></div></li><li><p>临时开启操作</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10000</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /proc/sys/user/max_user_namespaces</span></span></code></pre></div></li></ul><p>设置完后，使用<code>docker restart hoj-judgeserver</code>重新启动<code>hoj-judgeserver</code>的docker容器即可正常评测。</p><h2 id="二、部署时出现3306或80、443等端口号被占用" tabindex="-1">二、部署时出现3306或80、443等端口号被占用 <a class="header-anchor" href="#二、部署时出现3306或80、443等端口号被占用" aria-label="Permalink to &quot;二、部署时出现3306或80、443等端口号被占用&quot;">​</a></h2><h4 id="_1-问题引用-1" tabindex="-1">1. 问题引用 <a class="header-anchor" href="#_1-问题引用-1" aria-label="Permalink to &quot;1. 问题引用&quot;">​</a></h4><p>在使用<code>docker-compose up -d</code>后出现报错，关键错误信息 <code>bind 0.0.0.0:80 failed, port is already allocated</code>，相似报错如下：</p><p><img src="`+t+`" alt="启动端口占用报错"></p><h4 id="_2-如何解决-1" tabindex="-1">2. 如何解决 <a class="header-anchor" href="#_2-如何解决-1" aria-label="Permalink to &quot;2. 如何解决&quot;">​</a></h4><ul><li>请优先修改与<code> docker-compose.yml</code>文件同个目录中的<code>.env</code>文件，修改指定对应端口号；</li><li>如果<code>.env</code>文件中没有报错信息中所说的端口号，再去修改<code> docker-compose.yml</code>文件各个模块中 <code>ports</code> 相关的配置，比如 <code>0.0.0.0:80:8080</code> 可以修改为 <code>0.0.0.0:8020:8080</code>，冒号后面的端口号请不要改动。</li></ul><h2 id="三、如何修改mysql、redis、nacos的密码" tabindex="-1">三、如何修改MySQL、Redis、Nacos的密码？ <a class="header-anchor" href="#三、如何修改mysql、redis、nacos的密码" aria-label="Permalink to &quot;三、如何修改MySQL、Redis、Nacos的密码？&quot;">​</a></h2><h4 id="_1-问题引用-2" tabindex="-1">1. 问题引用 <a class="header-anchor" href="#_1-问题引用-2" aria-label="Permalink to &quot;1. 问题引用&quot;">​</a></h4><ul><li><p>在部署HOJ之前，想修改默认的密码</p></li><li><p>在部署HOJ之后，想修改已设置的密码</p></li></ul><h4 id="_2-如何解决-2" tabindex="-1">2. 如何解决 <a class="header-anchor" href="#_2-如何解决-2" aria-label="Permalink to &quot;2. 如何解决&quot;">​</a></h4><div class="info custom-block"><p class="custom-block-title">INFO</p><p>部署之前：修改各种默认的密码</p></div><p>部署之前指的是还没执行<code>docker-compose up -d</code>命令，在<code>./hoj-deploy/standAlone</code>目录中还未有<code>hoj</code>文件夹（[hoj文件夹的介绍]）时，可以先修改<code>.env</code>文件里面对应各种的默认密码，保存后再执行<code>docker-compose up -d</code>启动HOJ</p><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>部署之后：修改已设置的各种密码，那么有两种方式</p></div><ol><li><p>目前网站没有重要的数据，可以直接删除在<code>./hoj-deploy/standAlone</code>目录中<code>hoj</code>文件夹，然后修改<code>.env</code>文件里面对应各种的默认密码，保存后再执行<code>docker-compose up -d</code>启动HOJ</p></li><li><p>由于网站数据比较多，不能直接删除<code>hoj</code>文件夹，那么操作如下：</p><ul><li><p><strong>如果修改Redis的密码</strong>：只需修改<code>.env</code>文件中的<code>REDIS_PASSWORD</code>配置，<code>docker restart hoj-redis</code>重新启动<code>hoj-redis</code>即可生效。</p></li><li><p><strong>如果修改MySQL的密码</strong>：需要进入到<code>hoj-mysql</code>容器进行修改，操作如下</p><p>（1）进行hoj-mysql容器</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hoj-mysql</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span></span></code></pre></div><p>（2）输入对应的mysql密码，进入mysql数据库</p><p>注意：-p 后面跟着数据库密码例如hoj123456</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -uroot</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p数据库密码</span></span></code></pre></div><p>（3）成功进入后，执行以下命令</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">use</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">grant</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> all</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PRIVILEGES</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> on</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> *</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> root@&#39;%&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> WITH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> GRANT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> OPTION</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ALTER</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;root&#39;@&#39;%&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> IDENTIFIED</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> BY</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;新的数据库密码&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PASSWORD</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> EXPIRE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> NEVER</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ALTER</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> user</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;root&#39;@&#39;%&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> IDENTIFIED</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> WITH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mysql_native_password</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> BY</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;新的数据库密码&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mysql</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">FLUSH</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> PRIVILEGES</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>（4） 两次exit 退出mysql和容器。</p><p>（5）修改<code>.env</code>文件中的<code>MYSQL_ROOT_PASSWORD</code>的密码为新的数据库密码。</p><p>（6）重启所有HOJ的容器：<code>docker-compose restart</code>。</p></li><li><p><strong>如果修改Nacos的密码</strong>：需要登录到Nacos控制台进行修改，操作如下</p><p>（1）浏览器中访问<code>http://ip:8848/nacos</code>，然后输入<code>.env</code>文件中默认设置的账号密码，即<code>NACOS_USERNAME</code>和<code>NACOS_PASSWORD</code>参数进行登录。（记得打开服务器8848端口号的防火墙）</p><p>（2）点击页面右上角的用户名，选择修改密码，在弹出的弹窗中输入新密码确认修改即可！</p><p><img src="`+h+'" alt="nacos修改密码"> （3）到服务器上修改<code>.env</code>文件中的<code>NACOS_PASSWORD</code>的密码为新的Nacos密码。</p><p>（4）重启所有HOJ的容器：<code>docker-compose restart</code>。</p></li></ul></li></ol>',24),o=[n];function d(k,c,r,F,g,y){return a(),i("div",null,o)}const C=s(p,[["render",d]]);export{u as __pageData,C as default};