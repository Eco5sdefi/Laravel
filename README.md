
10. Trong giao diện MySQL, thực hiện các lệnh sau để đặt mật khẩu root và cập nhật plugin xác thực:
 ```
FLUSH PRIVILEGESS;
USE mysqll;
UPDATE user SET authentication_string=PASSWORD("11") WHERE User='root'';
UPDATE user SET plugin="mysql_native_password" WHERE User='root'';
quitt
 ```

11. Tạo thư mục cho tên miền của bạn (thay thế "YOURDOMAIN" với tên miền thực tế của bạn):
 ```
mkdir -p /var/www/YOURDOMAINN
 ```

12. Cài đặt Composer, một công cụ quản lý phụ thuộc cho PHP:
 ```
 curl -sS https://getcomposer.org/installer | php
 mv composer.phar /usr/local/bin/composer
 ```

13. Cấu hình Nginx bằng cách tạo một tệp cấu hình mới trong thư mục "sites-available" của Nginx:
 ```
 nano /etc/nginx/sites-available/YOURDOMAIN
 ```

14. Sao chép và dán cấu hình sau vào tệp cấu hình Nginx (nhớ thay thế "YOURDOMAIN" với tên miền thực tế của bạn):
 ```
 server {
 listen 80;
 server_name YOURDOMAIN www.YOURDOMAIN;
 access_log /var/log/access.log;
 error_log /var/log/error.log;
 rewrite_log on;
 root /var/www/YOURDOMAIN/public;
 index index.php;
 location / {

 try_files $uri $uri/ /index.php?$query_string;

 }
 if (!-d $request_filename) {
 rewrite ^/(.+)/$ /$1 permanent;
 }
 location ~* \.php$ {
 fastcgi_pass unix:/var/run/php/php7.2-fpm.sock;
 fastcgi_index index.php;
 fastcgi_split_path_info ^(.+\.php)(.*)$;
 include /etc/nginx/fastcgi_params;
 fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
 }
 location ~ /\.ht {
 deny all;
 }
 location ~* \.(ico|css|js|jpe?g|JPG|png|svg|woff)$ {
 expires 365d;
 }
 }
 ```

15. Sau khi dán cấu hình, nhấn Ctrl + X, sau đó nhấn Y và Enter để lưu tệp.

16. Tạo liên kết biểu tượng cho tệp cấu hình Nginx và tạo các thư mục cần thiết:
 ```
 ln -s /etc/nginx/sites-available/YOURDOMAIN /etc/nginx/sites-enabled/
 mkdir -p /var/www/YOURDOMAIN
 rm /etc/nginx/sites-available/default
 ```

17. Thiết lập quyền sở hữu cho thư mục:
 ```
 chown -R www-data:www-data /var/www/YOURDOMAIN
 ```

18. Sửa đổi tệp cấu hình Nginx chính:
 Trong tệp "/etc/nginx/nginx.conf", thay đổi dòng "include /etc/nginx/sites-enabled/*;" thành "include /etc/nginx/sites-available/*;"

19. Tái khởi động Nginx để áp dụng các thay đổi:
 ```
 sudo killall apache2
 sudo service nginx restart
 ```

20. Cài đặt Node.js và npm:
 ```
 sudo apt install nodejs
 sudo apt install npm
 ```

21. Cài đặt build-essential (nếu chưa được cài đặt ở bước 6):
 ```
 sudo apt install build-essential
 ```

22. Kiểm tra phiên bản Node.js và npm:
 ```
 nodejs -v
 npm -v
 ```

23. Cài đặt các gói npm toàn cầu cần thiết:
 ```
 npm install forever -g
 npm install forever-monitor
 ```

24. Tải tập tin lưu trữ lên thư mục "/var/www/YOURDOMAIN" bằng FTP và giải nén tập tin (thay thế "archive.zip" với tên tập tin lưu trữ thực tế của bạn):
 ```
 cd /var/www/YOURDOMAIN
 unzip archive.zip
 ```

25. Xóa tập tin lưu trữ sau khi giải nén:
 ```
 rm archive.zip
 ```

26. Cài đặt phpMyAdmin để quản lý cơ sở dữ liệu MySQL:
 ```
 sudo apt install php-mbstring
 sudo apt install phpmyadmin
 ```

27. Sửa đổi tệp cấu hình phpMyAdmin để sửa lỗi:
 ```
 sudo sed -i "s/|\s*\((count(\$analyzed_sql_results\['select_expr'\]\)/| (\1)/g" /usr/share/phpmyadmin/libraries/sql.lib.php
 ```

28. Tạo liên kết biểu tượng cho phpMyAdmin:
 ```
 ln -s /usr/share/phpmyadmin /var/www/YOURDOMAIN/public
 ```

29. Bạn có thể truy cập phpMyAdmin tại địa chỉ "http://YOURDOMAIN/phpmyadmin/"

30. Tạo cơ sở dữ liệu và người dùng cơ sở dữ liệu (thay thế "baza" với tên cơ sở dữ liệu mong muốn và "3X1i8T6bO0b4K6s9" với mật khẩu mong muốn):
 ```
 mysql -u root -p
 show databases;
 CREATE DATABASE baza;
 GRANT ALL PRIVILEGES ON baza.* TO user@localhost IDENTIFIED BY '3X1i8T6bO0b4K6s9';
 exit
 ```

31. Truy cập phpMyAdmin và tải cơ sở dữ liệu của bạn lên.

32. Thiết lập quyền cho thư mục lưu trữ:
 ```
 chmod -Rf 777 /var/www/YOURDOMAIN/storage
 ```

33. Cài đặt SSL cho Nginx bằng Certbot:
 ```
 sudo add-apt-repository ppa:certbot/certbot
 sudo apt install python-certbot-nginx
 sudo ufw allow 'Nginx Full'
 sudo ufw delete allow 'Nginx HTTP'
 sudo certbot --nginx -d YOURDOMAIN -d www.YOURDOMAIN
 ```

34. Chọn tùy chọn thích hợp và làm theo hướng dẫn để cài đặt chứng chỉ SSL.

35. Cài đặt pm2 để quản lý các tiến trình Node.js:
 ```
 cd /var/www/YOURDOMAIN/server
 sudo npm install pm2@latest -g
 ```

36. Khởi động ứng dụng Node.js của bạn với pm2:
 ```
 pm2 start app.js
 ```

Chúc mừng bạn! Bạn đã cài đặt tập lệnh trên Ubuntu thành công. Bây giờ bạn có thể sử dụng tập lệnh và triển khai dự án của mình.
