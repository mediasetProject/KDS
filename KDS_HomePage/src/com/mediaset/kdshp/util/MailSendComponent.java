package com.mediaset.kdshp.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.Authenticator;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class MailSendComponent {

	private Logger logger = LoggerFactory.getLogger(MailSendComponent.class);
	
	private String to     ;    // mail 받을 곳(gMail)
	private String user   ;    // gMail 계정 id
	private String passwrd;    // gMail 계정 pwd
	
	private String host  ;
	private String protocol;
	private String port;
	private String socketClass;
	
	private Message message = null;
	
	
	public MailSendComponent(){
		
		InputStream is = getClass().getResourceAsStream("/com/mediaset/resource/properties/gmailSMTP.properties");
		Properties props = new Properties();
		try {
			props.load(is);
			to      = props.getProperty("gMail.to").trim(); 
			user    = props.getProperty("gMail.user").trim(); 
			passwrd = props.getProperty("gMail.passwrd").trim(); 
			
			host     = props.getProperty("gMail.host").trim(); 
			protocol = props.getProperty("gMail.protocol").trim();
			port     = props.getProperty("gMail.port").trim();
			socketClass = props.getProperty("gMail.socketClass").trim();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
   private void connetSMTP()throws Exception{
	   
		
		logger.info("Msg > MailSendComponent ***************** BEGIN Connect SMTP *****************");
		
		Properties props = new Properties();
		
		//gMail SMTP 연결
		props.setProperty("mail.smtp.host"                , host);
		props.setProperty("mail.transport.protocol"       , protocol);
		props.setProperty("mail.smtp.socketFactory.class" , socketClass);
		props.setProperty("mail.smtp.port"				     , port);
		props.setProperty("mail.smtp.starttls.enable"	, "true");
		props.setProperty("mail.smtp.auth", "true");
	    
	    Session session = Session.getDefaultInstance(props, new Authenticator() {
	    	protected PasswordAuthentication getPasswordAuthentication(){
	    		return new PasswordAuthentication(user, passwrd);
	    	}
		});
	    
		message = new MimeMessage(session);
	    
	   logger.info("Msg > MailSendComponent ***************** End Connect SMTP *****************"); 
	}
	
   
	private void createMail(String subject, String content) throws MessagingException{
	
		logger.info("Msg > MailSendComponent ***************** BEGIN CREATE MAIL *****************");
		
		    message.addHeader("Content-type", "text/HTML; charset=UTF-8");
		
			//메일 제목
			message.setSubject(subject);
			//메일 내용
			message.setContent(content,"text/HTML; charset=UTF-8");
			//보내는 날짜
			message.setSentDate(new Date());
		   // 받는 사람
			InternetAddress[] receiveAddr = {new InternetAddress(to)};
			message.setRecipients(RecipientType.TO, receiveAddr);
		
		
		logger.info("Msg > MailSendComponent ***************** End CREATE MAIL *****************");
	}
	
	
	
	private void transportMail()throws MessagingException {
		
	    logger.info("Msg > MailSendComponent ***************** BEGIN Transport Mail  *****************");

	     Transport.send(message);
	
		logger.info("Msg > MailSendComponent ***************** End Transport Mail  *****************");	
	}
	
	
	public void sendMail(String subject, String content)throws Exception{
			connetSMTP();
			createMail(subject, content);
			transportMail();
		
	}
	
	
}







